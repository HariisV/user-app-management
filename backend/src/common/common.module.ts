import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { AuthMiddleware } from './auth.middleware';
import { JwtModule } from '@nestjs/jwt';

import * as path from 'path';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';
import { MailerService } from './mailler.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          const logMessage =
            typeof message === 'object'
              ? JSON.stringify(message, null, 2)
              : message;
          return `${timestamp} [${level.toUpperCase()}]: ${logMessage}`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          level: 'warn',
        }),
        new winston.transports.File({
          filename: path.join(__dirname, 'logs/error.log'),
          level: 'error',
        }),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'secret',

      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    PrismaService,
    FacebookStrategy,
    GoogleStrategy,
    ValidationService,
    MailerService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [
    PrismaService,
    ValidationService,
    FacebookStrategy,
    GoogleStrategy,
    MailerService,
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('/api/users/login').forRoutes('*');
  }
}

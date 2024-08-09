import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigModule } from './common/jwt.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtConfigModule,
    CommonModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  exports: [JwtConfigModule, PassportModule, CommonModule], // Export JwtConfigModule instead of JwtModule
})
export class AppModule {}

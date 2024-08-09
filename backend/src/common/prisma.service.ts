import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super({
      log: [
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
    // Adding middleware for soft delete
    // Middleware setup for soft delete
    this.$use(async (params, next) => {
      // if (params.model === 'User') {
      if (params.action === 'findMany' || params.action === 'findFirst') {
        if (params.args.where) {
          params.args.where.deletedAt = null;
        } else {
          params.args.where = { deletedAt: null };
        }
      } else if (params.action === 'delete') {
        params.action = 'update';
        params.args.data = { deletedAt: new Date() };
      } else if (params.action === 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data) {
          params.args.data.deletedAt = new Date();
        } else {
          params.args.data = { deletedAt: new Date() };
        }
      }

      return next(params);
    });
  }

  onModuleInit() {
    this.$on('info', (e) => {
      this.logger.info(e);
    });
    this.$on('warn', (e) => {
      this.logger.warn(e);
    });
    this.$on('error', (e) => {
      this.logger.error(e);
    });
    this.$on('query', (e) => {
      this.logger.info(e);
    });
  }
}

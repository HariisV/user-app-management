import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { Logger } from 'winston';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { PaginationService } from 'src/common/pagination.service';
import { User } from '@prisma/client';
import {
  ChangePasswordRequest,
  ChangeProfileRequest,
} from 'src/model/user.model';
import { UserValidation } from './user.validation';
import { PaginationResponse } from 'src/model/web.model';
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    private validatationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private PrismaService: PrismaService,
    private readonly jwtService: JwtService,
    private paginationService: PaginationService,
  ) {}

  async get(query: any): Promise<PaginationResponse> {
    const model = this.PrismaService.user;

    return this.paginationService.returnPagination(query, model);
  }

  async myProfile(user: User): Promise<User> {
    await this.PrismaService.user.update({
      where: {
        email: user.email,
      },
      data: {
        lastActiveAt: new Date(),
      },
    });

    return user;
  }

  async changePassword(
    user: User,
    request: ChangePasswordRequest,
  ): Promise<User> {
    const changePasswordRequest: ChangePasswordRequest =
      this.validatationService.validate(
        UserValidation.CHANGE_PASSWORD,
        request,
      );

    const result = await this.PrismaService.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: await bcrypt.hash(changePasswordRequest.password, 10),
      },
    });

    return result;
  }

  async changeProfile(
    user: User,
    request: ChangeProfileRequest,
  ): Promise<User> {
    const changeProfileValidate: ChangeProfileRequest =
      this.validatationService.validate(UserValidation.CHANGE_PROFILE, request);

    const result = await this.PrismaService.user.update({
      where: {
        email: user.email,
      },
      data: {
        name: changeProfileValidate.name,
      },
    });

    return result;
  }

  async dashboard(): Promise<any> {
    const active7Days = await this.PrismaService.user.count({
      where: {
        lastActiveAt: {
          gte: moment().subtract(7, 'days').toDate(),
        },
      },
    });

    const countAllUser = await this.PrismaService.user.count();
    return {
      newUserRegistered: await this.PrismaService.user.count({
        where: {
          createdAt: {
            gte: moment().startOf('day').toDate(),
          },
        },
      }),
      activeUser: await this.PrismaService.user.count({
        where: {
          lastActiveAt: {
            gte: moment().startOf('day').toDate(),
          },
        },
      }),

      averageActiveUser7Days: Math.floor((active7Days / countAllUser) * 100),
    };
  }
}

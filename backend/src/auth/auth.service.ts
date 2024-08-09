import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
} from 'src/model/user.model';
import { Logger } from 'winston';
import { AuthValidation } from './auth.validation';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { PaginationService } from 'src/common/pagination.service';
import { MESSAGE } from 'src/common/message.const';
import { MailerService } from 'src/common/mailler.service';

@Injectable()
export class AuthService {
  constructor(
    private validatationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private PrismaService: PrismaService,
    private readonly jwtService: JwtService,
    private paginationService: PaginationService,
    private mailerService: MailerService,
  ) {}

  async login(request: LoginUserRequest): Promise<LoginUserResponse> {
    this.logger.info(`UserService.login ${JSON.stringify(request)}`);

    const loginRequest: LoginUserRequest = this.validatationService.validate(
      AuthValidation.LOGIN,
      request,
    );

    const user = await this.PrismaService.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new HttpException(MESSAGE.LOGIN_FAILED, 400);
    }

    if (!user.verifyAt) {
      throw new HttpException(MESSAGE.EMAIL_NOT_VERIFIED, 400);
    }

    const isPasswordMatch = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException(MESSAGE.LOGIN_FAILED, 400);
    }

    await this.PrismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastActiveAt: new Date(),
        countLogin: user.countLogin + 1,
      },
    });

    delete user.password;
    return {
      user: user,
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  async register(request: RegisterUserRequest): Promise<LoginUserResponse> {
    this.logger.info(`UserService.register ${JSON.stringify(request)}`);

    const registerRequest: RegisterUserRequest =
      this.validatationService.validate(AuthValidation.REGISTER, request);

    const user = await this.PrismaService.user.findUnique({
      where: {
        email: registerRequest.email,
      },
    });

    if (user) {
      throw new HttpException(MESSAGE.EMAIL_EXISTED, 400);
    }

    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);

    const result = await this.PrismaService.user.create({
      data: {
        email: registerRequest.email,
        name: registerRequest.name,
        password: hashedPassword,
      },
    });

    await this.mailerService.sendMail(
      request.email,
      `Welcome At User Management APP`,
      'register.ejs',
      {
        name: request.name,
        link: `${process.env.BACKEND_URL}/api/auth/verify?token=${Buffer.from(request.email).toString('base64')}`,
      },
    );

    delete result.password;
    return {
      user: result,
      token: this.jwtService.sign({ id: result.id }),
    };
  }

  async resendVerification(email: string): Promise<any> {
    const user = await this.PrismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(MESSAGE.EMAIL_NOT_FOUND, 400);
    }

    if (user.verifyAt) {
      throw new HttpException(MESSAGE.EMAIL_VERIFIED, 400);
    }

    await this.mailerService.sendMail(
      email,
      `Welcome At User Management APP`,
      'register.ejs',
      {
        name: user.name,
        link: `${process.env.BACKEND_URL}/api/auth/verify?token=${Buffer.from(email).toString('base64')}`,
      },
    );

    return {
      message: MESSAGE.RESEND_EMAIL_SUCCESS,
    };
  }

  async verifyEmail(token: string): Promise<string> {
    const email = Buffer.from(token, 'base64').toString('ascii');
    const user = await this.PrismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(MESSAGE.EMAIL_NOT_FOUND, 400);
    }

    await this.PrismaService.user.update({
      where: {
        email,
      },
      data: {
        verifyAt: new Date(),
      },
    });

    return this.jwtService.sign({ id: user.id });
  }

  async logout(id: number): Promise<any> {
    return await this.PrismaService.user.update({
      where: {
        id,
      },
      data: {
        lastLogoutAt: new Date(),
      },
    });
  }
}

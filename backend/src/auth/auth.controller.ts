import {
  Controller,
  HttpCode,
  Get,
  Req,
  UseGuards,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserRequest, RegisterUserRequest } from 'src/model/user.model';
import { MESSAGE } from 'src/common/message.const';
import { Auth } from 'src/common/auth.decorator';
import { User } from '@prisma/client';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(@Req() req: any, @Res() res: any): Promise<any> {
    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/redirect/${req.user.token}`,
    );
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() request: LoginUserRequest): Promise<any> {
    console.log(111);
    const result = await this.authService.login(request);

    return {
      data: result,
      message: MESSAGE.LOGIN_SUCCESS,
    };
  }

  @Post('/register')
  @HttpCode(200)
  async register(@Body() request: RegisterUserRequest): Promise<any> {
    const result = await this.authService.register(request);

    return {
      data: result,
      message: MESSAGE.REGISTER_SUCCESS,
    };
  }

  @Get('/verify')
  @HttpCode(200)
  async verifyEmail(@Req() req: any, @Res() res: any): Promise<any> {
    const result = await this.authService.verifyEmail(req.query.token);

    return res.redirect(`${process.env.FRONTEND_URL}/auth/redirect/${result}`);
  }

  @Post('/resend-verification')
  @HttpCode(200)
  async resendVerification(@Body() request: any): Promise<any> {
    await this.authService.resendVerification(request.email);

    return {
      message: MESSAGE.EMAIL_VERIFIED,
    };
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req: any, @Res() res: any): Promise<any> {
    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/redirect/${req.user.token}`,
    );
  }

  @Post('/logout')
  @HttpCode(200)
  async logout(@Auth() user: User): Promise<any> {
    await this.authService.logout(user.id);

    return {
      message: MESSAGE.LOGOUT_SUCCESS,
    };
  }
}

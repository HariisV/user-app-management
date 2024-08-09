import { Controller, HttpCode, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/common/auth.decorator';
import { User } from '@prisma/client';
import {
  PaginationQuery,
  PaginationResponse,
  WebResponse,
} from 'src/model/web.model';
import {
  ChangePasswordRequest,
  ChangeProfileRequest,
  UserResponse,
} from 'src/model/user.model';
import { MESSAGE } from 'src/common/message.const';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/get')
  @HttpCode(200)
  async get(@Query() query: PaginationQuery): Promise<PaginationResponse> {
    return await this.userService.get(query);
  }

  @Get('/my-profile')
  @HttpCode(200)
  async myProfile(@Auth() user: User): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.myProfile(user);

    delete result.password;

    return {
      data: result,
      message: MESSAGE.GET_PROFILE_SUCCESS,
    };
  }

  @Post('/change-profile')
  @HttpCode(200)
  async changeProfile(
    @Auth() user: User,
    @Body() data: ChangeProfileRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.changeProfile(user, data);

    delete result.password;

    return {
      data: result,
      message: MESSAGE.CHANGE_PROFILE_SUCCESS,
    };
  }

  @Post('/change-password')
  @HttpCode(200)
  async changePassword(
    @Auth() user: User,
    @Body() data: ChangePasswordRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.changePassword(user, data);

    delete result.password;

    return {
      data: result,
      message: MESSAGE.CHANGE_PASSWORD_SUCCESS,
    };
  }

  @Get('/dashboard')
  @HttpCode(200)
  async dashboard(): Promise<WebResponse<any>> {
    return {
      data: await this.userService.dashboard(),
      message: MESSAGE.GET_DASHBOARD_SUCCESS,
    };
  }
}

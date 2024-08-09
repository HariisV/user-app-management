import { UserService } from './user.service';
import { User } from '@prisma/client';
import { PaginationQuery, PaginationResponse, WebResponse } from 'src/model/web.model';
import { ChangePasswordRequest, ChangeProfileRequest, UserResponse } from 'src/model/user.model';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    get(query: PaginationQuery): Promise<PaginationResponse>;
    myProfile(user: User): Promise<WebResponse<UserResponse>>;
    changeProfile(user: User, data: ChangeProfileRequest): Promise<WebResponse<UserResponse>>;
    changePassword(user: User, data: ChangePasswordRequest): Promise<WebResponse<UserResponse>>;
    dashboard(): Promise<WebResponse<any>>;
}

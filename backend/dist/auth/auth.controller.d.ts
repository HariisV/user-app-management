import { AuthService } from './auth.service';
import { LoginUserRequest, RegisterUserRequest } from 'src/model/user.model';
import { User } from '@prisma/client';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    facebookLogin(req: any, res: any): Promise<any>;
    login(request: LoginUserRequest): Promise<any>;
    register(request: RegisterUserRequest): Promise<any>;
    verifyEmail(req: any, res: any): Promise<any>;
    resendVerification(request: any): Promise<any>;
    googleLogin(req: any, res: any): Promise<any>;
    logout(user: User): Promise<any>;
}

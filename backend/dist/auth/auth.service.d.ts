import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { LoginUserRequest, LoginUserResponse, RegisterUserRequest } from 'src/model/user.model';
import { Logger } from 'winston';
import { JwtService } from '@nestjs/jwt';
import { PaginationService } from 'src/common/pagination.service';
import { MailerService } from 'src/common/mailler.service';
export declare class AuthService {
    private validatationService;
    private logger;
    private PrismaService;
    private readonly jwtService;
    private paginationService;
    private mailerService;
    constructor(validatationService: ValidationService, logger: Logger, PrismaService: PrismaService, jwtService: JwtService, paginationService: PaginationService, mailerService: MailerService);
    login(request: LoginUserRequest): Promise<LoginUserResponse>;
    register(request: RegisterUserRequest): Promise<LoginUserResponse>;
    resendVerification(email: string): Promise<any>;
    verifyEmail(token: string): Promise<any>;
    logout(id: number): Promise<any>;
}

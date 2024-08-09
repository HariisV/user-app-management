import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { Logger } from 'winston';
import { JwtService } from '@nestjs/jwt';
import { PaginationService } from 'src/common/pagination.service';
import { User } from '@prisma/client';
import { ChangePasswordRequest, ChangeProfileRequest } from 'src/model/user.model';
import { PaginationResponse } from 'src/model/web.model';
export declare class UserService {
    private validatationService;
    private logger;
    private PrismaService;
    private readonly jwtService;
    private paginationService;
    constructor(validatationService: ValidationService, logger: Logger, PrismaService: PrismaService, jwtService: JwtService, paginationService: PaginationService);
    get(query: any): Promise<PaginationResponse>;
    myProfile(user: User): Promise<User>;
    changePassword(user: User, request: ChangePasswordRequest): Promise<User>;
    changeProfile(user: User, request: ChangeProfileRequest): Promise<User>;
    dashboard(): Promise<any>;
}

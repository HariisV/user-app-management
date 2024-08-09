"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const prisma_service_1 = require("../common/prisma.service");
const validation_service_1 = require("../common/validation.service");
const winston_1 = require("winston");
const auth_validation_1 = require("./auth.validation");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const pagination_service_1 = require("../common/pagination.service");
const message_const_1 = require("../common/message.const");
const mailler_service_1 = require("../common/mailler.service");
let AuthService = class AuthService {
    constructor(validatationService, logger, PrismaService, jwtService, paginationService, mailerService) {
        this.validatationService = validatationService;
        this.logger = logger;
        this.PrismaService = PrismaService;
        this.jwtService = jwtService;
        this.paginationService = paginationService;
        this.mailerService = mailerService;
    }
    async login(request) {
        this.logger.info(`UserService.login ${JSON.stringify(request)}`);
        const loginRequest = this.validatationService.validate(auth_validation_1.AuthValidation.LOGIN, request);
        const user = await this.PrismaService.user.findUnique({
            where: {
                email: loginRequest.email,
            },
        });
        if (!user) {
            throw new common_1.HttpException(message_const_1.MESSAGE.LOGIN_FAILED, 400);
        }
        if (!user.verifyAt) {
            throw new common_1.HttpException(message_const_1.MESSAGE.EMAIL_NOT_VERIFIED, 400);
        }
        const isPasswordMatch = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordMatch) {
            throw new common_1.HttpException(message_const_1.MESSAGE.LOGIN_FAILED, 400);
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
    async register(request) {
        this.logger.info(`UserService.register ${JSON.stringify(request)}`);
        const registerRequest = this.validatationService.validate(auth_validation_1.AuthValidation.REGISTER, request);
        const user = await this.PrismaService.user.findUnique({
            where: {
                email: registerRequest.email,
            },
        });
        if (user) {
            throw new common_1.HttpException(message_const_1.MESSAGE.EMAIL_EXISTED, 400);
        }
        const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
        const result = await this.PrismaService.user.create({
            data: {
                email: registerRequest.email,
                name: registerRequest.name,
                password: hashedPassword,
            },
        });
        await this.mailerService.sendMail(request.email, `Welcome At User Management APP`, 'register.ejs', {
            name: request.name,
            link: `${process.env.BACKEND_URL}/api/auth/verify?token=${Buffer.from(request.email).toString('base64')}`,
        });
        delete result.password;
        return {
            user: result,
            token: this.jwtService.sign({ id: result.id }),
        };
    }
    async resendVerification(email) {
        const user = await this.PrismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new common_1.HttpException(message_const_1.MESSAGE.EMAIL_NOT_FOUND, 400);
        }
        if (user.verifyAt) {
            throw new common_1.HttpException(message_const_1.MESSAGE.EMAIL_VERIFIED, 400);
        }
        await this.mailerService.sendMail(email, `Welcome At User Management APP`, 'register.ejs', {
            name: user.name,
            link: `${process.env.BACKEND_URL}/api/auth/verify?token=${Buffer.from(email).toString('base64')}`,
        });
        return {
            message: message_const_1.MESSAGE.RESEND_EMAIL_SUCCESS,
        };
    }
    async verifyEmail(token) {
        const email = Buffer.from(token, 'base64').toString('ascii');
        const user = await this.PrismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new common_1.HttpException(message_const_1.MESSAGE.EMAIL_NOT_FOUND, 400);
        }
        return await this.PrismaService.user.update({
            where: {
                email,
            },
            data: {
                verifyAt: new Date(),
            },
        });
    }
    async logout(id) {
        return await this.PrismaService.user.update({
            where: {
                id,
            },
            data: {
                lastLogoutAt: new Date(),
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [validation_service_1.ValidationService,
        winston_1.Logger,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        pagination_service_1.PaginationService,
        mailler_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
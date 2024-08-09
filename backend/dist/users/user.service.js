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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const prisma_service_1 = require("../common/prisma.service");
const validation_service_1 = require("../common/validation.service");
const winston_1 = require("winston");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const pagination_service_1 = require("../common/pagination.service");
const user_validation_1 = require("./user.validation");
const moment = require("moment");
let UserService = class UserService {
    constructor(validatationService, logger, PrismaService, jwtService, paginationService) {
        this.validatationService = validatationService;
        this.logger = logger;
        this.PrismaService = PrismaService;
        this.jwtService = jwtService;
        this.paginationService = paginationService;
    }
    async get(query) {
        const model = this.PrismaService.user;
        return this.paginationService.returnPagination(query, model);
    }
    async myProfile(user) {
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
    async changePassword(user, request) {
        const changePasswordRequest = this.validatationService.validate(user_validation_1.UserValidation.CHANGE_PASSWORD, request);
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
    async changeProfile(user, request) {
        const changeProfileValidate = this.validatationService.validate(user_validation_1.UserValidation.CHANGE_PROFILE, request);
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
    async dashboard() {
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
            averageActiveUser7Days: active7Days / countAllUser,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [validation_service_1.ValidationService,
        winston_1.Logger,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        pagination_service_1.PaginationService])
], UserService);
//# sourceMappingURL=user.service.js.map
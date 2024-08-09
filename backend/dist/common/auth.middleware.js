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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const jwt_1 = require("@nestjs/jwt");
const message_const_1 = require("./message.const");
let AuthMiddleware = class AuthMiddleware {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        let token = '';
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.replace('Bearer ', '');
        }
        if (token) {
            const decodedToken = this.jwtService.decode(token);
            if (!decodedToken) {
                throw new common_1.HttpException(message_const_1.MESSAGE.AUTH_INVALID, 401);
            }
            const user = await this.prismaService.user.findFirst({
                where: {
                    id: decodedToken.id,
                },
            });
            if (!user) {
                throw new common_1.HttpException(message_const_1.MESSAGE.AUTH_INVALID, 401);
            }
            if (user) {
                req.user = user;
            }
        }
        next();
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map
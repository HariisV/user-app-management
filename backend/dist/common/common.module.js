"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const prisma_service_1 = require("./prisma.service");
const validation_service_1 = require("./validation.service");
const core_1 = require("@nestjs/core");
const error_filter_1 = require("./error.filter");
const auth_middleware_1 = require("./auth.middleware");
const jwt_1 = require("@nestjs/jwt");
const path = require("path");
const facebook_strategy_1 = require("./facebook.strategy");
const google_strategy_1 = require("./google.strategy");
const mailler_service_1 = require("./mailler.service");
let CommonModule = class CommonModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).exclude('/api/users/login').forRoutes('*');
    }
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot({
                format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ timestamp, level, message }) => {
                    const logMessage = typeof message === 'object'
                        ? JSON.stringify(message, null, 2)
                        : message;
                    return `${timestamp} [${level.toUpperCase()}]: ${logMessage}`;
                })),
                transports: [
                    new winston.transports.Console({
                        level: 'warn',
                    }),
                    new winston.transports.File({
                        filename: path.join(__dirname, 'logs/error.log'),
                        level: 'error',
                    }),
                ],
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            jwt_1.JwtModule.register({
                secret: 'secret',
                signOptions: { expiresIn: '60s' },
            }),
        ],
        providers: [
            prisma_service_1.PrismaService,
            facebook_strategy_1.FacebookStrategy,
            google_strategy_1.GoogleStrategy,
            validation_service_1.ValidationService,
            mailler_service_1.MailerService,
            {
                provide: core_1.APP_FILTER,
                useClass: error_filter_1.ErrorFilter,
            },
        ],
        exports: [
            prisma_service_1.PrismaService,
            validation_service_1.ValidationService,
            facebook_strategy_1.FacebookStrategy,
            google_strategy_1.GoogleStrategy,
            mailler_service_1.MailerService,
        ],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map
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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_decorator_1 = require("../common/auth.decorator");
const web_model_1 = require("../model/web.model");
const user_model_1 = require("../model/user.model");
const message_const_1 = require("../common/message.const");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async get(query) {
        return await this.userService.get(query);
    }
    async myProfile(user) {
        const result = await this.userService.myProfile(user);
        delete result.password;
        return {
            data: result,
            message: message_const_1.MESSAGE.GET_PROFILE_SUCCESS,
        };
    }
    async changeProfile(user, data) {
        const result = await this.userService.changeProfile(user, data);
        delete result.password;
        return {
            data: result,
            message: message_const_1.MESSAGE.CHANGE_PROFILE_SUCCESS,
        };
    }
    async changePassword(user, data) {
        const result = await this.userService.changePassword(user, data);
        delete result.password;
        return {
            data: result,
            message: message_const_1.MESSAGE.CHANGE_PASSWORD_SUCCESS,
        };
    }
    async dashboard() {
        return {
            data: await this.userService.dashboard(),
            message: message_const_1.MESSAGE.GET_DASHBOARD_SUCCESS,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/get'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web_model_1.PaginationQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/my-profile'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, auth_decorator_1.Auth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Post)('/change-profile'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, auth_decorator_1.Auth)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_model_1.ChangeProfileRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeProfile", null);
__decorate([
    (0, common_1.Post)('/change-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, auth_decorator_1.Auth)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_model_1.ChangePasswordRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('/dashboard'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "dashboard", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
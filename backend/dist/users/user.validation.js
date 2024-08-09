"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.CHANGE_PASSWORD = zod_1.z.object({
    oldPassword: zod_1.z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
    })
        .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
    })
        .regex(/\d/, { message: 'Password must contain at least one digit' })
        .regex(/[\W_]/, {
        message: 'Password must contain at least one special character',
    })
        .max(255),
    password: zod_1.z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
    })
        .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
    })
        .regex(/\d/, { message: 'Password must contain at least one digit' })
        .regex(/[\W_]/, {
        message: 'Password must contain at least one special character',
    })
        .max(255),
});
UserValidation.CHANGE_PROFILE = zod_1.z.object({
    name: zod_1.z.string().max(255),
});
//# sourceMappingURL=user.validation.js.map
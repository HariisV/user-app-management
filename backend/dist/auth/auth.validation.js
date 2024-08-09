"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
class AuthValidation {
}
exports.AuthValidation = AuthValidation;
AuthValidation.LOGIN = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .max(255)
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
    }),
});
AuthValidation.REGISTER = zod_1.z.object({
    name: zod_1.z.string().max(255),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .max(255)
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
    }),
});
//# sourceMappingURL=auth.validation.js.map
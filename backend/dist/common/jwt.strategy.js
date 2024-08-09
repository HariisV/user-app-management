"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = exports.handleRedirectLogin = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const handleRedirectLogin = async (prisma, email, name, jwt) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email.value,
        },
    });
    if (!user) {
        const newUser = await prisma.user.create({
            data: {
                email: email.value,
                name: name.givenName,
                password: '',
                verifyAt: new Date(),
                countLogin: 1,
            },
        });
        return {
            user: newUser,
            token: jwt.sign({ id: newUser.id }),
        };
    }
    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            lastActiveAt: new Date(),
            countLogin: user.countLogin + 1,
        },
    });
    return {
        user,
        token: jwt.sign({ id: user.id }),
    };
};
exports.handleRedirectLogin = handleRedirectLogin;
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey',
        });
    }
    async validate(payload) {
        return { userId: payload.sub, username: payload.username };
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map
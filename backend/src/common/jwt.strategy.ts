import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';

import { ExtractJwt, Strategy } from 'passport-jwt';

export const handleRedirectLogin = async (
  prisma: PrismaClient,
  email: { value: string },
  name: { givenName: string },
  jwt: JwtService,
) => {
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

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

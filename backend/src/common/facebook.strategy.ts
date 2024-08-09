import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { PrismaService } from './prisma.service';
import { handleRedirectLogin } from './jwt.strategy';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly jwtService: JwtService,
    private PrismaService: PrismaService,
  ) {
    super({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/facebook`,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;

    return done(
      null,
      await handleRedirectLogin(
        this.PrismaService,
        emails[0],
        name,
        this.jwtService,
      ),
    );
  }
}

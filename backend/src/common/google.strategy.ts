import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { handleRedirectLogin } from './jwt.strategy';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly jwtService: JwtService,
    private PrismaService: PrismaService,
  ) {
    super({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google`,
      scope: ['email', 'profile'], // Request the user's email and profile
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
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

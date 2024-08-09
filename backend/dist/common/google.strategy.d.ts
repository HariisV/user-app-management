import { Profile, VerifyCallback } from 'passport-google-oauth20';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
declare const GoogleStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly jwtService;
    private PrismaService;
    constructor(jwtService: JwtService, PrismaService: PrismaService);
    validate(_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void>;
}
export {};

import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-facebook';
import { PrismaService } from './prisma.service';
declare const FacebookStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private readonly jwtService;
    private PrismaService;
    constructor(jwtService: JwtService, PrismaService: PrismaService);
    validate(_accessToken: string, _refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any>;
}
export {};

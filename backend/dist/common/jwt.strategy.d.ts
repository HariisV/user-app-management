import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { Strategy } from 'passport-jwt';
export declare const handleRedirectLogin: (prisma: PrismaClient, email: {
    value: string;
}, name: {
    givenName: string;
}, jwt: JwtService) => Promise<{
    user: {
        id: number;
        name: string;
        password: string;
        email: string;
        verifyAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        lastActiveAt: Date | null;
        lastLogoutAt: Date | null;
        countLogin: number;
    };
    token: string;
}>;
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        username: any;
    }>;
}
export {};

import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MESSAGE } from './message.const';

interface DecodedToken {
  id: number;
  // Add any other properties that you expect in the token
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async use(req: any, res: any, next: (error?: any) => void) {
    let token = '';
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.replace('Bearer ', '');
    }

    if (token) {
      const decodedToken = this.jwtService.decode(token) as DecodedToken;

      if (!decodedToken) {
        throw new HttpException(MESSAGE.AUTH_INVALID, 401);
      }
      const user = await this.prismaService.user.findFirst({
        where: {
          id: decodedToken.id,
        },
      });

      if (!user) {
        throw new HttpException(MESSAGE.AUTH_INVALID, 401);
      }

      if (user) {
        req.user = user;
      }
    }

    next();
  }
}

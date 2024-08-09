import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PaginationService } from 'src/common/pagination.service';

@Module({
  providers: [AuthService, PaginationService],
  controllers: [AuthController],
  imports: [],
})
export class AuthModule {}

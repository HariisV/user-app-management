import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PaginationService } from 'src/common/pagination.service';

@Module({
  providers: [UserService, PaginationService],
  controllers: [UserController],
  imports: [],
})
export class UserModule {}

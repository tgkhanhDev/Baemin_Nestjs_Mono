import { Module } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UserApiController } from './user-api.controller';
import { PrismaPostgresService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserApiController],
  providers: [UserApiService, PrismaPostgresService],
})
export class UserApiModule {}

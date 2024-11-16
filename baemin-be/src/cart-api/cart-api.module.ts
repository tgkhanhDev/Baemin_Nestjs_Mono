import { Module } from '@nestjs/common';
import { CartApiService } from './cart-api.service';
import { CartApiController } from './cart-api.controller';
import { PrismaPostgresService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CartApiController],
  providers: [CartApiService, PrismaPostgresService],
})
export class CartApiModule {}

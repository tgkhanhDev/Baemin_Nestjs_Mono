import { Module } from '@nestjs/common';
import { ShopApiService } from './shop-api.service';
import { ShopApiController } from './shop-api.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaPostgresService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ShopApiController],
  providers: [ShopApiService, PrismaPostgresService],
})
export class ShopModule { }

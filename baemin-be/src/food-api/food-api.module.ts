import { Module } from '@nestjs/common';
import { FoodApiService } from './food-api.service';
import { FoodApiController } from './food-api.controller';
import { PrismaPostgresService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FoodApiController],
  providers: [FoodApiService, PrismaPostgresService],
})
export class FoodApiModule { }

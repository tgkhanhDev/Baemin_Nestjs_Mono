import { Module } from '@nestjs/common';
import { TransactionApiService } from './transaction-api.service';
import { TransactionApiController } from './transaction-api.controller';
import { PrismaPostgresService } from 'src/prisma/prisma.service';
import { FoodApiService } from 'src/food-api/food-api.service';

@Module({
  controllers: [TransactionApiController],
  providers: [TransactionApiService, FoodApiService , PrismaPostgresService],
})
export class TransactionApiModule {}

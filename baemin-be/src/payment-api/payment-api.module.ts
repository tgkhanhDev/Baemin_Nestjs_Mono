import { Module } from '@nestjs/common';
import { PaymentApiService } from './payment-api.service';
import { PaymentApiController } from './payment-api.controller';
import { PrismaPostgresService } from 'src/prisma/prisma.service';
import { TransactionApiService } from 'src/transaction-api/transaction-api.service';
import { FoodApiService } from 'src/food-api/food-api.service';

@Module({
  controllers: [PaymentApiController],
  providers: [PaymentApiService, TransactionApiService, FoodApiService, PrismaPostgresService],
})
export class PaymentApiModule {}

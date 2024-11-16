import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionApiModule } from './transaction-api/transaction-api.module';
import { PrismaModule } from './prisma/prisma.module';
import { ShopModule } from './shop-api/shop-api.module';
import { ConfigModule } from '@nestjs/config';
import { FoodApiModule } from './food-api/food-api.module';
import { PaymentApiModule } from './payment-api/payment-api.module';

@Module({
  imports: [PrismaModule, FoodApiModule, ShopModule, TransactionApiModule, ConfigModule.forRoot({ isGlobal: true }), PaymentApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

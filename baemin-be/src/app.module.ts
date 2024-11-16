import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionApiModule } from './transaction-api/transaction-api.module';
import { PrismaModule } from './prisma/prisma.module';
import { ShopModule } from './shop-api/shop-api.module';
import { ConfigModule } from '@nestjs/config';
import { FoodApiModule } from './food-api/food-api.module';
import { PaymentApiModule } from './payment-api/payment-api.module';
import { UserApiModule } from './user-api/user-api.module';
import { CartApiModule } from './cart-api/cart-api.module';
import { AuthApiModule } from './auth-api/auth-api.module';

@Module({
  imports: [PrismaModule, FoodApiModule, ShopModule, TransactionApiModule, ConfigModule.forRoot({ isGlobal: true }), PaymentApiModule, UserApiModule, CartApiModule, AuthApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

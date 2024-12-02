import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTransactionDto, FilterTransactionDto } from './dto/request/create-transaction.dto';
import { lastValueFrom } from 'rxjs';
import { PrismaPostgresService } from 'src/prisma/prisma.service';
import { TransactionResponseDto } from './dto/response/response-transaction.dto';
import { transaction_status } from './entities/transaction.entity';
import { FoodApiService } from 'src/food-api/food-api.service';

@Injectable()
export class TransactionApiService {
    constructor(
        private postgresDAO: PrismaPostgresService,
        private foodApiService: FoodApiService
    ) { }

    async createTransaction(req: CreateTransactionDto): Promise<any> {

        const { food_id, food_name, quantity, type, food_thumbnail, per_price, payment_id , shop_id} = req;

        const isPaymentExists = payment_id && await this.postgresDAO.payment.findUnique({
            where: { payment_id: payment_id },
        });

        const isShopExists =  await this.postgresDAO.shop.findUnique({
            where: { shop_id },
        });

        const isFoodExists = await this.postgresDAO.food.findUnique({
            where: { food_id },
        })

        if (!isFoodExists) {
            throw new HttpException(`Food ID: ${food_id} does not exist.`, HttpStatus.NOT_FOUND);
        } else if(quantity > isFoodExists.quantity) {
            throw new HttpException(`Quantity must be less than or equal to ${isFoodExists.quantity}.`, HttpStatus.BAD_REQUEST);
        }

        if (payment_id && !isPaymentExists) {
            throw new HttpException(`Payment ID: ${payment_id} does not exist.`, HttpStatus.NOT_FOUND);
        }

        if (!isShopExists) {
            throw new HttpException(`Shop ID: ${shop_id} does not exist.`, HttpStatus.NOT_FOUND);
        }


        return this.postgresDAO.transaction.create({
            data: {
                food_id,
                food_name,
                per_price,
                type,
                food_thumbnail,
                quantity,
                shop_id,
                payment_id: payment_id || null,
                status: transaction_status.complete,
            }
        });
    }

    async getTransactionsWithFilter(filter: FilterTransactionDto): Promise<TransactionResponseDto[]> {

        const { transaction_id, payment_id, status } = filter

        return await this.postgresDAO.transaction.findMany({
            where: {
                ...(transaction_id ? { transaction_id } : {}),
                ...(payment_id ? { payment_id } : {}),
                ...(status ? { status } : {})
            },
            select: {
                transaction_id: true,
                food_id: true,
                food_name: true,
                food_thumbnail: true,
                shop_id: true,
                type: true,
                quantity: true,
                per_price: true,
                status: true,
                payment: {
                    select: {
                        payment_id: true,
                        delivery_address: true,
                        message: true,
                        status: true,
                        total_cost: true,
                        transaction: false
                    }
                },
            }
        })
    }

    //Huy thi khong cho add nua
    async updateTransactionStatus(transaction_id: string, status: transaction_status) {

        const isTransactionExist = await this.postgresDAO.transaction.findUnique({
            where: {
                transaction_id
            }
        })

        if(!isTransactionExist) {
            throw new HttpException("Transaction ID does not exist.", HttpStatus.NOT_FOUND);
        }

        if(status == transaction_status.in_progress) {
            this.foodApiService.reduceQuantityByFoodId(isTransactionExist.food_id, isTransactionExist.quantity);
        }

        return await this.postgresDAO.transaction.update({
            where: {
                transaction_id
            },
            data: {
                status
            }
        })
    }

}

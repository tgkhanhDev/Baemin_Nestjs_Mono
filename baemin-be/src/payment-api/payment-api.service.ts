import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaPostgresService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { payment_status } from '.prismas/client-postgres';
import { TransactionResponseDto } from 'src/transaction-api/dto/response/response-transaction.dto';
import { TransactionApiService } from 'src/transaction-api/transaction-api.service';
import { CreateTransactionDto } from 'src/transaction-api/dto/request/create-transaction.dto';

@Injectable()
export class PaymentApiService {
    constructor(
        private postgresDAO: PrismaPostgresService,
        private transactionApiService: TransactionApiService
    ) { }

    async findAllByaccountId(account_id: string) {
        return this.postgresDAO.payment.findMany({
            where: {
                account_id
            }
        });
    }

    async createPayment(req: CreatePaymentDto) {
        const { delivery_address, message, status, transactions, account_id } = req;

        // Step 1: Create the Payment first, without transactions
        const resPayment = await this.postgresDAO.payment.create({
            data: {
                delivery_address,
                total_cost: 0, // Temporary value, to be updated later
                message,
                account_id,
                status: payment_status.Unpaid, // Default to 'Unpaid'
            },
        });

        let total_cost = 0;
        const listTransaction = [];

        // Step 2: Create Transactions associated with the Payment
        for (let transaction of transactions) {
            total_cost += transaction.per_price * transaction.quantity;

            // Create the transaction and associate it with the payment
            const createdTransaction = await this.transactionApiService.createTransaction({
                ...transaction,
                payment_id: resPayment.payment_id, // Associate with the payment
            });

            listTransaction.push(createdTransaction);
        }

        // Step 3: Update the Payment's total_cost
        const updatedPayment = await this.postgresDAO.payment.update({
            where: { payment_id: resPayment.payment_id },
            data: { total_cost }, // Update the total cost with the sum of the transactions
        });

        // Step 4: Return the payment and associated transactions
        return {
            payment_id: updatedPayment.payment_id,
            account_id: updatedPayment.account_id,
            delivery_address: updatedPayment.delivery_address,
            message: updatedPayment.message,
            status: updatedPayment.status,
            total_cost: updatedPayment.total_cost,
            transactions: listTransaction,
        };
    }


    //Should add Wallet later
    async payForPayment(payment_id: string) {

        const payment = await this.postgresDAO.payment.findUnique({
            where: {
                payment_id
            }
        })
        if(payment.status === payment_status.Paid) {
            throw new HttpException(`Payment ID: ${payment_id} has been paid.`, HttpStatus.BAD_REQUEST);
        }

        const res = this.postgresDAO.payment.update({
            where: {
                payment_id
            },
            data: {
                status: payment_status.Paid
            }
        })
        //find all transaction by payment_id
        const transList = await this.postgresDAO.transaction.findMany({
            where: {
                payment_id
            }
        })

        //deduct amount in food stock
        transList.map(async (trans) => {
            const food = await this.postgresDAO.food.findUnique({
                where: {
                    food_id: trans.food_id
                }
            })
            await this.postgresDAO.food.update({
                where: {
                    food_id: trans.food_id
                },
                data: {
                    quantity: food.quantity - trans.quantity
                }
            })
        })

        return res

    }
}

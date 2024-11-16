import { payment_status } from '.prismas/client-postgres';
import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTransactionDto } from 'src/transaction-api/dto/request/create-transaction.dto';

export class CreatePaymentDto {
    @IsString()
    delivery_address: string;

    @IsString()
    message: string;

    // @IsNumber()
    // total_cost: number;

    @IsEnum(payment_status)
    @IsOptional()
    status: payment_status;

    @IsArray()
    @Type(() => CreateTransactionDto) // Ensure nested array is properly transformed
    transactions: CreateTransactionDto[];
}
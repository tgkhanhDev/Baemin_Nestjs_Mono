import { payment_status } from '.prismas/client-postgres';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateTransactionDto } from 'src/transaction-api/dto/request/create-transaction.dto';

export class CreatePaymentDto {
    @IsString()
    delivery_address: string;

    @IsString()
    message: string;

    @IsEnum(payment_status)
    @IsOptional()
    status: payment_status;

    @IsUUID()
    account_id: string;

    @IsArray()
    @ValidateNested({ each: true }) // Validate each item in the array
    @Type(() => CreateTransactionDto) // Transform array elements
    transactions: CreateTransactionDto[];
}
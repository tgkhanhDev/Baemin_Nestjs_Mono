import { transaction_status } from "src/transaction-api/entities/transaction.entity";
import { food_type } from '.prismas/client-postgres';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString, IsUrl, IsUUID } from "class-validator";

export class CreateTransactionDto {

    @IsUUID()
    food_id: string

    @IsString()
    food_name: string;

    @IsInt()
    @IsPositive()
    per_price: number;

    @IsEnum(food_type)
    type: food_type;

    @IsUrl()
    food_thumbnail: string;

    @IsInt()
    @IsPositive()
    quantity: number;

    @IsOptional()
    @IsUUID()
    payment_id?: string;

    @IsUUID()
    shop_id: string

}

export class FilterTransactionDto {
    transaction_id?: string;
    payment_id?: string;
    status?: transaction_status;
}
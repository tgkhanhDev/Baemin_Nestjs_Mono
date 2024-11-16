import { transaction_status, food_type } from '.prismas/client-postgres';
export class TransactionResponseDto {
    transaction_id: string;
    food_id: string;
    food_name: string;
    per_price: number;
    type: food_type;
    food_thumbnail?: string; // Optional field
    quantity: number;
    status: transaction_status;
    shop_id?: string; // Optional field
    payment_id?: string; // Optional field

}
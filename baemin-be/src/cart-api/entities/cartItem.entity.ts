import { IsInt, IsOptional, IsUUID, Min } from "class-validator";

export class CartItemEntity {
    @IsUUID()
    cart_item_id: string;

    @IsOptional()
    @IsUUID()
    account_id?: string;

    @IsOptional()
    @IsUUID()
    food_id?: string;

    @IsInt()
    @Min(1) // Ensure the quantity is at least 1
    quantity: number;
}
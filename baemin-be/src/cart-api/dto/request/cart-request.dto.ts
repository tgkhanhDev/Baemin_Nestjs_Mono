import { IsInt, IsOptional, IsUUID, Min } from "class-validator";

export class UpdateCartItemRequestDto {
    @IsUUID()
    cart_item_id: string;

    @IsInt()
    @Min(1) // Ensure the quantity is at least 1
    quantity: number;
}

export class AddCartItemRequestDto {
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
    
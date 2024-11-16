import { ApiProperty } from "@nestjs/swagger";
import { FoodType } from "src/food-api/entities/food.entity";

export class CreateFoodDto {
    @ApiProperty({ description: 'Name of the food item', example: 'Bubble Tea' })
    food_name: string;
  
    @ApiProperty({ description: 'Description of the food item', example: 'A refreshing bubble tea with tapioca pearls.' })
    description: string;
  
    @ApiProperty({ description: 'Price of the food item', example: 50000 })
    price: number;
  
    @ApiProperty({ enum: FoodType, description: 'Type of the food item', example: FoodType.bubble_tea })
    type: FoodType;
  
    @ApiProperty({ description: 'ID of the shop that owns the food item', example: 'd2fa29f2-3064-43d5-b5c6-810b989b2e56' })
    shop_id?: string; // Optional, depending on the use case
  }
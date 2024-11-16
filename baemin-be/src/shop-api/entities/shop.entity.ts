import { ApiProperty } from '@nestjs/swagger';
import { Food } from 'src/food-api/entities/food.entity';

export enum FoodType {
    COMBO = "combo",
    SALE = "sale",
    RICE_CHICKEN = "rice chicken", // Matches Prisma mapped name
    BUBBLE_TEA = "bubble tea",     // Matches Prisma mapped name
    NONE = "none",
}
export class Shop {
    @ApiProperty({ description: 'Unique identifier for the shop', example: 'e58f1b28-470e-485a-bc56-50108d08e197' })
    shop_id: string;

    @ApiProperty({ description: 'Name of the shop', example: 'Bubble Tea Cafe' })
    shop_name: string;

    @ApiProperty({ description: 'Address of the shop', example: '123 Main Street', nullable: true })
    shop_address?: string;

    @ApiProperty({ description: 'Thumbnail image URL for the shop', example: 'https://example.com/image.jpg', nullable: true })
    shop_thumbnail?: string;

    @ApiProperty({ description: 'Category of the shop', example: 'cafe' })
    category: string;

    @ApiProperty({ description: 'Label assigned to the shop', example: 'Top Rated' })
    label: string;

    @ApiProperty({ description: 'Location of the shop', example: 'Downtown' })
    location: string;

    @ApiProperty({ description: 'Shop rating', example: 4.5, nullable: true })
    rating?: number;

    @ApiProperty({ description: 'Opening time of the shop', example: '09:00:00', nullable: true, type: String })
    open_time?: Date;

    @ApiProperty({ description: 'Closing time of the shop', example: '21:00:00', nullable: true, type: String })
    close_time?: Date;

    @ApiProperty({ description: 'Starting price range', example: 10000, nullable: true })
    price_start?: number;

    @ApiProperty({ description: 'Ending price range', example: 50000, nullable: true })
    price_end?: number;

    @ApiProperty({ description: 'Indicates whether the shop is open', example: true })
    is_open: boolean;

    @ApiProperty({ description: 'List of food items available in the shop', type: [Food] })
    Food: Food[];
}

export enum ShopLabel {
    FOOD = "Food",
    DRINK = "Drink",
    VEGE = "Vege",
    DESSERT = "Dessert",
    NOODLES = "Noodles",
}

export enum ShopLocation {
    Ho_Chi_Minh = "Ho_Chi_Minh",
    Ha_Noi = "Ha_Noi",
    Da_Nang = "Da_Nang"
}
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ShopResponseDetailDto, ShopResponseDto } from './dto/shops-response.dto';
import { ShopFilterRequestDto } from './dto/shop-request.dto';
import { PrismaPostgresService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopApiService {
    constructor(
        private postgresDAO: PrismaPostgresService
    ) { }

    findAllShopFilter(shopFilterRequestDto: ShopFilterRequestDto): Promise<ShopResponseDto[]> {

        const { label, location, name } = shopFilterRequestDto;

        return this.postgresDAO.shop.findMany({
            where: {
                ...(label ? { label } : {}),  // Include 'label' only if it is not empty or undefined
                ...(location ? { location } : {}), // Include 'location' only if it is not empty or undefined
                ...(name ? { shop_name: { contains: name } } : {}), // Include 'name' only if it is not empty or undefined
            },
            select: {
                shop_id: true,
                shop_name: true,
                shop_address: true,
                shop_thumbnail: true,
                category: true,
                label: true,
                location: true,
                rating: true,
                open_time: true,
                close_time: true,
                price_start: true,
                price_end: true,
                is_open: true,
            },
        });
    }

    findShopById(shop_id: string): Promise<any> {
        return this.postgresDAO.shop.findUniqueOrThrow({
            where: {
                shop_id
            },
            select: {
                shop_id: true,
                shop_name: true,
                shop_address: true,
                shop_thumbnail: true,
                category: true,
                label: true,
                location: true,
                rating: true,
                open_time: true,
                close_time: true,
                price_start: true,
                price_end: true,
                is_open: true,
                food: {
                    select: {
                        food_id: true,
                        food_name: true,
                        description: true,
                        price: true,
                        type: true,
                        food_thumbnail: true,
                        shop: false,
                        shop_id: false
                    }
                }
            }
        })
    }


}

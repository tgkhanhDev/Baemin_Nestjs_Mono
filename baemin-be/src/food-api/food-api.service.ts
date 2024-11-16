import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaPostgresService } from 'src/prisma/prisma.service';
import { CreateFoodDto } from './dto/request/create-food.dto';
import { Food, FoodType } from './entities/food.entity';
import { Prisma, food_type as PrismaFoodType } from '.prismas/client-postgres';
import { UpdateFoodDto } from './dto/request/update-food.dto';

@Injectable()
export class FoodApiService {
    constructor(
        private postgresDAO: PrismaPostgresService
    ) { }

    create(createFoodDto: CreateFoodDto) {
        return 'This action adds a new food';
    }

    findAll() {
        return this.postgresDAO.food.findMany();
    }

    findById(id: string) {
        return this.postgresDAO.food.findFirstOrThrow({
            where: {
                food_id: id
            }
        });
    }

    async findByShopId(shop_id: string): Promise<Food[]> {

        const isShopExist = await this.postgresDAO.shop.findUnique({
            where: {
                shop_id
            }
        });

        if (!isShopExist) {
            throw new HttpException("Shop Id not found", HttpStatus.NOT_FOUND);
        }

        const res = await this.postgresDAO.food.findMany({
            where: {
                shop_id
            }
        });
        return res;
    }

    async reduceQuantityByFoodId(food_id: string, quantity: number) {

        if(quantity <= 0) {
            throw new HttpException("Quantity must be greater than 0", HttpStatus.BAD_REQUEST);
        }

        const isFoodExist = await this.postgresDAO.food.findUnique({
            where: {
                food_id
            }
        });

        if (!isFoodExist) {
            throw new HttpException("Food Id not found", HttpStatus.NOT_FOUND);
        }


        const res = await this.postgresDAO.food.update({
            where: {
                food_id
            },
            data: {
                quantity: {
                    decrement: quantity
                }
            }
        })

        return res;
    }
   
}


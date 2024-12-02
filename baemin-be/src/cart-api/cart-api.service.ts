import { Injectable } from '@nestjs/common';
import { PrismaPostgresService } from 'src/prisma/prisma.service';
import { CartItemEntity } from './entities/cartItem.entity';
import { AddCartItemRequestDto, UpdateCartItemRequestDto } from './dto/request/cart-request.dto';

@Injectable()
export class CartApiService {
    constructor(
        private postgresDAO: PrismaPostgresService
    ) {}

    async findCartItemByUserId(account_id: string) {
        const cartItem: CartItemEntity[] = await this.postgresDAO.cartitem.findMany({
            where: {
                account_id
            },
            select: {
                account_id: true,
                cart_item_id: true,
                quantity: true,
                food_id: true
            }
        });

        const res: any[] = await Promise.all(cartItem.map(async (item) => {
            const resItem: any = { ...item };

            const food = await this.postgresDAO.food.findUnique({
                where: {
                    food_id: item.food_id
                },
                select: {
                    food_id: true,
                    food_name: true,
                    description: true,
                    price: true,
                    type: true,
                    shop_id: true,
                    food_thumbnail: true,
                    shop: false
                }
            })

            resItem.food = food;

            return resItem;
        }));

        return res;
    }

    async deleteCartItem(cart_item_id: string) {
        return await this.postgresDAO.cartitem.deleteMany({
            where: {
                cart_item_id
            }
        })
    }

    async updateCartItem(cartInfo: UpdateCartItemRequestDto[]) {
        cartInfo.map(async (cartItem) => {
            await this.postgresDAO.cartitem.update({
                where: {
                    cart_item_id: cartItem.cart_item_id
                },
                data: {
                    quantity: cartItem.quantity
                }
            })
        })

        return {
            code: 200,
            message: "success"
        }
    }

    async emptyCartItem(account_id: string) {
        return await this.postgresDAO.cartitem.deleteMany({
            where: {
                account_id
            }
        })
    }

    async addItemToCart(req: AddCartItemRequestDto) {
        const {account_id, food_id, quantity} = req

        const item: CartItemEntity =  await this.postgresDAO.cartitem.findFirst({
            where: {
                account_id,
                food_id
            }
        })

        if(item) {
            return await this.postgresDAO.cartitem.update({
                where: {
                    cart_item_id: item.cart_item_id
                },
                data: {
                    quantity: item.quantity + quantity
                }
            })
        }

        return await this.postgresDAO.cartitem.create({
            data: {
                account_id: req.account_id,
                food_id: req.food_id,
                quantity: req.quantity
            }
        })
    }
}

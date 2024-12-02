import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CartApiService } from './cart-api.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AddCartItemRequestDto, UpdateCartItemRequestDto } from './dto/request/cart-request.dto';

@Controller('cart-api')
export class CartApiController {
  constructor(private readonly cartApiService: CartApiService) { }

  @Get('/:account_id')
  @ApiOperation({
    summary: 'Fetch cart items for user',
  })
  @ApiParam({
    name: 'account_id',
    required: true,
    type: String
  })
  async getCartItemsByUserId(@Param('account_id') account_id: string) {
    return this.cartApiService.findCartItemByUserId(account_id);
  }

  @Delete('/delete-item/:cartId')
  @ApiOperation({
    summary: 'Delete cart items for user',
  })
  async deleteCartItemsByUserId(@Param('cartId') cartId: string) {
    return this.cartApiService.deleteCartItem(cartId);
  }

  @Patch('/update-cart-item')
  @ApiOperation({
    summary: 'Delete cart items for user',
  })
  @ApiBody({
    type: [UpdateCartItemRequestDto],
    examples: {
      example1: {
        value: [
          {
            "cart_item_id": "",
            "quantity": 1
          }
        ]
      }
    }
  })
  async updateCartItemByUserIdAndFoodId(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) cartInfo: UpdateCartItemRequestDto[]) {
    return this.cartApiService.updateCartItem(cartInfo);
  }


  @Delete('/empty-cart/:account_id')
  @ApiOperation({
    summary: 'Delete cart items for user',
  })
  @ApiParam({
    name: 'account_id',
    required: true,
    type: String
  })
  async emptyCartItem(@Param('account_id') account_id: string) {
    return this.cartApiService.emptyCartItem(account_id);
  }

  @Post()
  @ApiOperation({
    summary: 'Add cart items for user',
  })
  @ApiBody({
    type: AddCartItemRequestDto,
    examples: {
      example1: {
        value: {
          "account_id": "",
          "food_id": "",
          "quantity": 1
        }
      }
    }
  })
  async addItemToCart(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) req: AddCartItemRequestDto) {
    return this.cartApiService.addItemToCart(req);}
}

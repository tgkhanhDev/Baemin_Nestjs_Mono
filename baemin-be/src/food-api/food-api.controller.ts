import { Controller, Get, Inject, Param } from '@nestjs/common';
import { FoodApiService } from './food-api.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Food } from './entities/food.entity';

@Controller('food-api')
@ApiTags("Food")
export class FoodApiController {
  constructor(private readonly foodApiService: FoodApiService,
  ) { }

  @Get('/food')
  @ApiOperation({
    summary: 'Get all food items',
    // description: 'Fetches a list of all available food items from the database',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all food items',
    type: [Food],  // Array of Food objects as response
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async findAllFoods() {
    let res = await this.foodApiService.findAll();
    return res;
  }

  @Get('/food/:foodId')
  @ApiOperation({
    summary: 'Get all food items',
    // description: 'Fetches a list of all available food items from the database',
  })
  @ApiParam({
    name: 'foodId',
    required: true,
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all food items',
    type: [Food],  // Array of Food objects as response
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async findFoodById(@Param('foodId') foodId: string) {
    let res = await this.foodApiService.findById(foodId);
    return res;
  }

  @Get('/food/:shopId')
  @ApiOperation({
    summary: 'Get food by shop id',
  })
  @ApiOkResponse({
    description: 'Successfully fetched food by shop id',
    // type: ApiUtilResponse<Food[]>,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async findAllFoodsByShopId(@Param('shopId') shopId: string): Promise<Food[]> {
    const res = await this.foodApiService.findByShopId(shopId);
    return res;
  }
}

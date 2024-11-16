import { Controller, Get, Param, Query } from '@nestjs/common';
import { ShopApiService } from './shop-api.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { ShopResponseDetailDto, ShopResponseDto } from './dto/shops-response.dto';
import { ShopLocation, ShopLabel } from './entities/shop.entity';
import { ShopFilterRequestDto } from './dto/shop-request.dto';

@Controller('shop-api')
@ApiTags("Shop")
export class ShopApiController {
  constructor(private readonly shopApiService: ShopApiService) { }

  @Get('')
  @ApiOperation({
    summary: 'Get all shops by label',
  })
  @ApiQuery({
    name: 'label',
    enum: ShopLabel,
    example: ShopLabel.FOOD,
    required: false,
  })
  @ApiQuery({
    name: 'location',
    enum: ShopLocation,
    example: ShopLocation.Ho_Chi_Minh,
    required: false,
  })
  @ApiQuery({
    name: 'name',
    example: "Dessert Kingdom",
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all food items',
    type: [ShopResponseDto],
  })
  async findAllShops(@Query() filter: ShopFilterRequestDto): Promise<ShopResponseDto[]> {
    const res = await this.shopApiService.findAllShopFilter(filter);
    return res;
  }

  @Get('/:shop_id')
  @ApiOperation({
    summary: 'Get shop details by ID',
  })
  @ApiParam({
    name: 'shop_id',
    description: 'ID of the shop to retrieve details for',
    required: true,
    example: '4e69b389-9d4b-401a-943d-936bbde62f1a',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched shop details',
    type: ShopResponseDetailDto,
  })
  async findShopDetailById(@Param('shop_id') shop_id: string): Promise<ShopResponseDetailDto> {
    const res = await this.shopApiService.findShopById(shop_id);
    return res;
  }

}

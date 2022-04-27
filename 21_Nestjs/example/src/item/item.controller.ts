import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/user/user.decorator';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsDto } from './dto/get-items.dto';
import { ItemInfo, MinimumItemInfo } from './item.interface';
import { ItemService } from './item.service';

@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @ApiOperation({
    summary: '상품정보 등록 API',
    description: '상품 정보를 등록',
  })
  async addItem(@Body() createItemDto: CreateItemDto) {
    return await this.itemService.createItem(createItemDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: '상품리스트 조회 API',
    description: '상품 정보를 조회',
  })
  @ApiResponse({ type: MinimumItemInfo, isArray: true })
  async getItems(@Query() getItemsDto: GetItemsDto) {
    return await this.itemService.getItems(getItemsDto);
  }

  @Get(':itemId')
  @ApiOperation({
    summary: '특정 상품 정보 획득 API',
    description: '상품 정보를 조회',
  })
  @ApiResponse({ type: ItemInfo })
  async getSpecificItem(@Param('itemId') itemId: number) {
    return await this.itemService.getSpecificItemById(itemId);
  }

  // 상품 구매

  @Post(':itemId/buy')
  @ApiOperation({
    summary: '상품 구매 API',
    description: '상품 구매',
  })
  @ApiBearerAuth()
  async buySpecificItem(
    @User('email') email: string,
    @Param('itemId') itemId: number,
  ) {
    return await this.itemService.buySpecificItem(email, itemId);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsDto } from './dto/get-items.dto';
import { ItemEntity } from './item.entity';
import { ItemInfo, MinimumItemInfo } from './item.interface';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createItem(createItemDto: CreateItemDto) {
    const newItem = new ItemEntity();
    newItem.title = createItemDto.title;
    newItem.imageUri = createItemDto.imageUri;
    newItem.desc = createItemDto.desc;
    newItem.price = createItemDto.price;
    newItem.category = createItemDto.category;

    return (await this.itemRepository.save(newItem)).id;
  }

  async getItems(getItemsDto: GetItemsDto) {
    const { pageIdx, pageSize, sortOption } = getItemsDto;
    const list = await this.itemRepository.getItems(
      pageIdx,
      pageSize,
      sortOption,
    );
    return MinimumItemInfo.ofArray(list);
  }

  async getSpecificItemById(itemId: number) {
    return ItemInfo.of(await this.itemRepository.findOne(itemId));
  }

  async buySpecificItem(email: string, itemId: number) {
    const user = await this.userRepository.findUserByEmail(email);
    const item = await this.itemRepository.findOne(itemId);

    if (user.point.amount >= item.price) {
      user.point.amount -= item.price;
      this.userRepository.save(user);
    } else {
      throw new HttpException(
        { message: 'not enough point' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

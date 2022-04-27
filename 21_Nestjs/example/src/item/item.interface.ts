import { ApiProperty } from '@nestjs/swagger';
import { ItemCategory, ItemEntity } from './item.entity';

export class MinimumItemInfo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  imageUri: string;
  @ApiProperty()
  price: number;

  static of(itemEntity: ItemEntity) {
    const miniItemInfo = new MinimumItemInfo();
    miniItemInfo.id = itemEntity.id;
    miniItemInfo.title = itemEntity.title;
    miniItemInfo.imageUri = itemEntity.imageUri;
    miniItemInfo.price = itemEntity.price;
    return miniItemInfo;
  }
  static ofArray(itemEntities: ItemEntity[]) {
    const list = itemEntities.map((item) => {
      return MinimumItemInfo.of(item);
    });
    return list;
  }
}

export class ItemInfo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  imageUri: string;
  @ApiProperty()
  desc: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  category: ItemCategory;

  static of(itemEntity: ItemEntity) {
    const itemInfo = new ItemInfo();
    itemInfo.id = itemEntity.id;
    itemInfo.title = itemEntity.title;
    itemInfo.imageUri = itemEntity.imageUri;
    itemInfo.desc = itemEntity.desc;
    itemInfo.price = itemEntity.price;
    itemInfo.category = itemEntity.category;
    return itemInfo;
  }
}

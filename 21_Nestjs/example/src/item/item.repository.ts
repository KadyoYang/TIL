import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { SortOption } from './dto/get-items.dto';
import { ItemEntity } from './item.entity';

@EntityRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity> {
  async getItems(pageIdx: number, pageSize: number, sortOption?: SortOption) {
    const query = await createQueryBuilder()
      .select('item')
      .from(ItemEntity, 'item')
      .limit(pageSize)
      .offset(pageSize * (pageIdx - 1));

    if (sortOption === SortOption.PRICE_ASC) {
      query.orderBy('item.price', 'ASC');
    } else if (sortOption === SortOption.PRICE_DESC) {
      query.orderBy('item.price', 'DESC');
    } else {
      query.orderBy('item.id', 'DESC');
    }
    return await query.disableEscaping().getMany();
  }
}

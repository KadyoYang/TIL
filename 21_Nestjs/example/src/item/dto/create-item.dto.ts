import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { ItemCategory } from '../item.entity';

export class CreateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly imageUri: string;

  @ApiProperty()
  readonly desc: string;

  @ApiProperty()
  @IsPositive()
  readonly price: number;

  @ApiProperty({
    enum: [ItemCategory.CLOTH, ItemCategory.FOOD, ItemCategory.NOTEBOOK],
  })
  readonly category: ItemCategory;
}

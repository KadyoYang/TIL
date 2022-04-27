import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export enum SortOption {
  PRICE_DESC = 'priceDesc',
  PRICE_ASC = 'priceAsc',
}

export class GetItemsDto {
  @ApiProperty()
  @Min(1)
  @Type(() => Number)
  readonly pageIdx: number;
  @ApiProperty()
  @Max(50)
  @Type(() => Number)
  readonly pageSize: number;
  @ApiProperty({
    enum: [SortOption.PRICE_ASC, SortOption.PRICE_DESC],
    required: false,
  })
  readonly sortOption: SortOption;
}

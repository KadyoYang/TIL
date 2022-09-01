import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber } from "class-validator";

export enum Malls {
  SmartStore = "smartStore",
  LotteOn = "lotteOn",
  Coupang = "coupang",
  /** 위메프 */
  WeMakePrice = "weMakePrice",
  TMON = "tmon",
  GMarket = "gmarket",
  Auction = "auction",
  /** 11번가. 변수는 숫자로 시작할수 없어.... */
  St11 = "eleven",
  Imweb = "imweb",
  Cafe24 = "cafe24",
}

export class GetNumber {
  @ApiProperty({ type: Number, isArray: true })
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  arr: number[];
}

import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsInt } from "class-validator";
import { Child } from "./child.entity";

export class Man {
  @ApiProperty()
  kekeke: string;

  @ApiProperty({ type: () => Child })
  child: Child;
}

// 127.0.0.1:8080/api?offset=100&ids=1,2,3,4,5,6

export class GetHoursParam {
  @ApiProperty({ description: "offset" })
  @IsInt()
  @Type(() => Number)
  offset: number;

  @ApiProperty({ description: "ids", type: String })
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    value
      .trim()
      .split(",")
      .map((id) => Number(id))
  )
  ids: number[];
}

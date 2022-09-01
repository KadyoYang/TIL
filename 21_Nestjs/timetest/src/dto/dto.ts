import { applyDecorators, Type } from "@nestjs/common";
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from "@nestjs/swagger";
import { IsArray, IsInt, IsNumber } from "class-validator";
import { Malls } from "./enum";

export interface interinter {
  a: string;
  b: number;
  c: Malls;
}

export interface DantoDanto {
  orderId: string;
  mall: Malls;
}

export class Human {
  @ApiProperty({ description: "이름" })
  name: string;

  @ApiProperty()
  age: number;
}

export class SomeParam {
  @ApiProperty({ description: "인간들", type: Human, isArray: true })
  humans: Human[];

  @ApiProperty({ description: "나쁜인간들" })
  badHumans: Human[];

  @ApiProperty({ description: "인간하나" })
  human: Human;
}

export class ResultFindAndCount<T> {
  @ApiProperty({ description: "리스트" })
  list: T[];
  @ApiProperty({ description: "총합" })
  total: number;
}

export class AdminListResult<T> extends ResultFindAndCount<T> {
  @ApiProperty({ description: "주소" })
  address: {
    name: string;
    count: number;
  };
}

export class Data {
  @ApiProperty({ description: "name" })
  name: string;
  @ApiProperty({ description: "age" })
  age: number;
}

// 컨트롤러 위에 적을 데코레이터
export const ApiOkResponseResultFindAndCount = <DataDto extends Type<unknown>>(
  dataDto: DataDto
) =>
  applyDecorators(
    ApiExtraModels(ResultFindAndCount, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResultFindAndCount) },
          {
            properties: {
              list: {
                type: "array",
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    })
  );

export const ApiOkResponseAdminListResult = <DataDto extends Type<unknown>>(
  dataDto: DataDto
) =>
  applyDecorators(
    ApiExtraModels(AdminListResult, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(AdminListResult) },
          {
            properties: {
              list: {
                type: "array",
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    })
  );

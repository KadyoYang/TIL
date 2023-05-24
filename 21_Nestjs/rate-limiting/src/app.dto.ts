import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNumber, IsString } from "class-validator";

export class RequestGreetings {
  @ApiProperty()
  @IsString()
  greetings: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  howMany: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class TimeTestParam {
    @ApiProperty()
    @Type(()=> Date)
    @IsDate()
    readonly datetime: Date;
}
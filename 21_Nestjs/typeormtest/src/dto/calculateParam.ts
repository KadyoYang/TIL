import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";

export class CalculateParam {

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    genError?: boolean;
}
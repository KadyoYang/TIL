import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Min, Validate } from "class-validator";
import { AmmoType } from "./entity/enum";


export class AmmoAndQuantityParam {

    @ApiProperty({ enum: AmmoType })
    ammoType: AmmoType

    @ApiProperty()
    @Min(1)
    quantity: number;
}


export class AmmoQuantityAndSoldierId {
    @ApiProperty()
    soldierId: number;

    @ApiProperty({ enum: AmmoType })
    ammoType: AmmoType

    @ApiProperty()
    @Min(1)
    quantity: number;
}

export class UpdateAmmoParam {

    @ApiProperty({ type: [AmmoQuantityAndSoldierId] })
    @Type(() => AmmoQuantityAndSoldierId)
    data: AmmoQuantityAndSoldierId[];
}
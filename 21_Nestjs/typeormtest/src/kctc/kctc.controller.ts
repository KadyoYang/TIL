import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Validate } from "class-validator";
import { AmmoAndQuantityParam, UpdateAmmoParam } from "./dto";
import { KctcService } from "./kctc.service";


@ApiTags('kctc')
@Controller('kctc')
export class KctcController {
    constructor(private readonly kctcService: KctcService) { }

    @Get('soldier')
    async getSoldiers() {
        return await this.kctcService.getSoldiers();
    }


    @Post('soldier')
    async addSoldier(@Body() ammoAndQuantity: AmmoAndQuantityParam) {
        await this.kctcService.addSoldier(ammoAndQuantity);
    }

    @Delete('soldier/:id')
    async deleteSolider(@Param("id") id: number) {
        await this.kctcService.deleteSoldier(id);
    }


    @Get('ammo')
    async getAmmos() {
        return await this.kctcService.getAmmos();
    }

    @Post('ammo')
    async addAmmo(@Body() ammoAndQuantity: AmmoAndQuantityParam) {
        return await this.kctcService.addAmmo(ammoAndQuantity);
    }

    @Patch('redistribution')
    async doRedistribution(@Body() updateDat: UpdateAmmoParam) {
        return await this.kctcService.redistributionAmmo(updateDat);
    }

    @Delete('all')
    async deleteAllData() {
        return await this.kctcService.deleteAllTestData();
    }


}
import { HttpException, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AmmoAndQuantityParam, UpdateAmmoParam } from "./dto";
import { Ammo } from "./entity/ammo.entity";
import { AmmoType } from "./entity/enum";
import { Soldier } from "./entity/soldier.entity";


@Injectable()
export class KctcService {
    constructor(
        @InjectConnection()
        private readonly connection: Connection
    ) { }

    async getSoldiers() {
        return await this.connection.manager.find(Soldier);
    }

    async addSoldier(addSoldierParam: AmmoAndQuantityParam) {
        const { ammoType, quantity } = addSoldierParam;
        const ammo = await this.connection.manager.findOne(Ammo, { where: { ammoType: ammoType } })
        if (!ammo) {
            throw new HttpException("given ammo does not exist", 400)
        }
        if (ammo.availableQuantity - quantity < 0) {
            throw new HttpException('lack of ammo', 400);
        }

        const soldier = this.connection.manager.create(Soldier, { ammoType: ammoType, quantity: quantity });
        ammo.availableQuantity -= quantity;
        ammo.takenQuantity += quantity;


        await this.connection.manager.save(soldier);
        await this.connection.manager.save(ammo);

    }

    async deleteSoldier(soldierId: number) {
        const solider = await this.connection.manager.findOne(Soldier, soldierId);
        const ammo = await this.connection.manager.findOne(Ammo, { where: { ammoType: solider.ammoType } })

        ammo.availableQuantity += solider.quantity;
        ammo.takenQuantity -= solider.quantity;

        await this.connection.manager.remove(solider);
        await this.connection.manager.save(ammo);

    }

    async getAmmos() {
        return await this.connection.manager.find(Ammo);
    }

    async addAmmo(addAmmoParam: AmmoAndQuantityParam) {

        console.log(addAmmoParam);
        if (await this.connection.manager.findOne(Ammo, { where: { ammoType: addAmmoParam.ammoType } })) {
            throw new HttpException("given ammoType is aleady exist", 400);
        }

        const ammo = this.connection.manager.create(Ammo, { ammoType: addAmmoParam.ammoType, totalQuantity: addAmmoParam.quantity, availableQuantity: addAmmoParam.quantity, takenQuantity: 0 });
        await this.connection.manager.save(ammo);
    }

    async redistributionAmmo(updateDat: UpdateAmmoParam) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // await queryRunner.manager.save();
            for await (const dat of updateDat.data) {
                const soldier = await queryRunner.manager.findOne(Soldier, dat.soldierId);
                const beforeAmmo = await queryRunner.manager.findOne(Ammo, { where: { ammoType: soldier.ammoType } })
                beforeAmmo.availableQuantity += soldier.quantity;
                beforeAmmo.takenQuantity -= soldier.quantity;
                // 불출 탄약 원복
                await queryRunner.manager.save(beforeAmmo);
            }

            for await (const dat of updateDat.data) {
                const soldier = await queryRunner.manager.findOne(Soldier, dat.soldierId);
                const afterAmmo = await queryRunner.manager.findOne(Ammo, { where: { ammoType: dat.ammoType } })
                afterAmmo.availableQuantity -= dat.quantity;
                afterAmmo.takenQuantity += dat.quantity;
                // 탄약 불출
                if (afterAmmo.availableQuantity < 0) {
                    throw new HttpException('availableQuantity can not be less than zero', 400);
                }
                soldier.ammoType = dat.ammoType;
                soldier.quantity = dat.quantity;
                await queryRunner.manager.save(afterAmmo);
                await queryRunner.manager.save(soldier);
            }


            await queryRunner.commitTransaction();
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw new HttpException('availableQuantity can not be less than zero', 400);
        } finally {
            await queryRunner.release();
            console.log("finally");
        }


    }

    async deleteAllTestData() {
        await this.connection.createQueryBuilder().delete().from(Soldier).execute();
        await this.connection.createQueryBuilder().delete().from(Ammo).execute();
    }

}
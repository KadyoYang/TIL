
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AmmoType } from "./enum";
@Entity()
export class Ammo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: AmmoType,
        default: AmmoType.etc
    })
    ammoType: AmmoType;

    @Column()
    totalQuantity: number;

    @Column()
    availableQuantity: number;

    @Column()
    takenQuantity: number;


}
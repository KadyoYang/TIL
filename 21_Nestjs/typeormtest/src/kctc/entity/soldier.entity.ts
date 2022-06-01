
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AmmoType } from "./enum";
@Entity()
export class Soldier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: AmmoType,
        default: AmmoType.etc
    })
    ammoType: AmmoType;

    @Column()
    quantity: number;
}
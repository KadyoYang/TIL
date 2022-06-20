import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Fivo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;
}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ItemCategory {
  NOTEBOOK = 'Notebook',
  CLOTH = 'Cloth',
  FOOD = 'Food',
}

@Entity('tb_item')
export class ItemEntity {
  @PrimaryGeneratedColumn({ name: 'pk_item' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  imageUri: string;

  @Column({ type: 'varchar', length: 255 })
  desc: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ItemCategory,
  })
  category: ItemCategory;
}

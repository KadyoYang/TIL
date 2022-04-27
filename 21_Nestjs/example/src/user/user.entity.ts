import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PointEntity } from './point.entity';

@Entity('tb_user')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'pk_user' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  //relation
  @OneToOne(() => PointEntity, (point) => point.user, {
    cascade: ['insert', 'remove', 'update'],
  })
  point: PointEntity;
}

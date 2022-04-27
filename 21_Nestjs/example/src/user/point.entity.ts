import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('tb_point')
export class PointEntity {
  @PrimaryGeneratedColumn({ name: 'pk_point' })
  id: number;

  @Column()
  amount: number;

  @OneToOne(() => UserEntity, (user) => user.point)
  @JoinColumn({ name: 'fk_user' })
  user: UserEntity;
}

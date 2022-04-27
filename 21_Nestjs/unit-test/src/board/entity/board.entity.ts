import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boardName: string;

  // relations
  @OneToMany(() => Post, (post) => post.board)
  posts: Post[];
}

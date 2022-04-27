import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entity/board.entity';
import { Post } from '../entity/post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async getPosts(pageIdx: number, pageSize: number, boardId: number) {
    const query = await this.createQueryBuilder()
      .select('post')
      .from(Post, 'post')
      .leftJoin(Board, 'board')
      .where('board.id = :boardId', { boardId: boardId })
      .limit(pageSize)
      .offset(pageSize * (pageIdx - 1));

    return await query.disableEscaping().getMany();
  }
}

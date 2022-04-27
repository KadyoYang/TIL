import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findUserByEmail(email: string) {
    return await this.createQueryBuilder()
      .select('user')
      .from(UserEntity, 'user')
      .where('user.email = :email', { email: email })
      .leftJoinAndSelect('user.point', 'point')
      .getOne();
  }
}

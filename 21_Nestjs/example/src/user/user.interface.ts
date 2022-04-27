import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

// export interface UserData {
//   id: number;
//   email: string;
//   name: string;
//   point: number;
// }

// export function userEntityToUserData(userEntity: UserEntity) {
//   const userData: UserData = {
//     id: userEntity.id,
//     email: userEntity.email,
//     name: userEntity.name,
//     point: userEntity.point.amount,
//   };
//   return userData;
// }

export class UserData {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  point: number;

  static of(userEntity: UserEntity) {
    const userData = new UserData();

    userData.id = userEntity.id;
    userData.email = userEntity.email;
    userData.name = userEntity.name;
    userData.point = userEntity.point.amount;

    return userData;
  }
}

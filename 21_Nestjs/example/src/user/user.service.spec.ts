import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  getCustomRepositoryToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { getRepository } from 'typeorm';
import { SignupUserDto } from './dto/signup-user.dto';
import { PointEntity } from './point.entity';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

class MockUserRepository {
  async findUserByEmail(email: string) {
    const userEntity = new UserEntity();
    const pointEntity = new PointEntity();
    pointEntity.amount = 10000;
    if (email === 'aleadyis') {
      userEntity.email = email;
      userEntity.id = 1;
      userEntity.name = 'name';
      userEntity.point = pointEntity;
      return userEntity;
    } else {
      return;
    }
  }

  async save(entity: UserEntity) {
    entity.id = 1;
    return entity;
  }
}

class MockPointRepository {}

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getCustomRepositoryToken(UserRepository),
          useClass: MockUserRepository,
        },
        {
          provide: 'PointEntityRepository',
          useClass: MockPointRepository,
        },
        UserService,
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  describe('signup', () => {
    it('이메일 중복 될때 예외 발생되야함', async () => {
      const signupUserDto: SignupUserDto = {
        email: 'aleadyis',
        name: 'name',
        password: 'qwer1234',
      };
      await userService.signup(signupUserDto);
      await expect(userService.signup(signupUserDto)).rejects.toThrow(
        HttpException,
      );
    });

    it.todo('회원가입이 정상적으로 되어야함');
    it.todo('회원가입시 포인트 10000이 생겨있어야함');
  });

  describe('login', () => {
    it.todo('로그인 패스워드가 다르면 예외 발생되어야함');
    it.todo('로그인이 잘 되어야함 ');
  });
});

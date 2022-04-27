import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  createQueryBuilder,
  getRepository,
  Repository,
} from 'typeorm';
import { SignupUserDto } from './dto/signup-user.dto';
import { PointEntity } from './point.entity';
import { UserEntity } from './user.entity';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { createJwtToken } from './util/jwtUtil';
import { UserData } from './user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(PointEntity)
    private readonly pointRepository: Repository<PointEntity>,
  ) {}

  async signup(signupUserDto: SignupUserDto) {
    const { email, password, name } = signupUserDto;

    const user = await this.userRepository.findUserByEmail(email);
    if (user) {
      throw new HttpException(
        { message: 'invalid input data' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPoint = new PointEntity();
    newPoint.amount = 10000;

    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = await hash(password, 10);
    newUser.name = name;
    newUser.point = newPoint;

    const savedUser = await this.userRepository.save(newUser);
    return savedUser.id;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findUserByEmail(email);

    if (user && (await compare(password, user.password))) {
      return await createJwtToken(user);
    } else {
      throw new HttpException(
        { message: 'authentication failure' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProfile(email: string) {
    const user = await this.userRepository.findUserByEmail(email);

    return UserData.of(user);
  }
}

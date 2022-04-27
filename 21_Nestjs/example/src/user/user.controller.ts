import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { User } from './user.decorator';
import { UserData } from './user.interface';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '프로필 정보 API',
    description: '프로필 정보를 획득',
  })
  @ApiResponse({ type: UserData, description: '프로필 정보를 리턴' })
  async getProfile(@User('email') email: string) {
    const userData = await this.userService.getProfile(email);
    return userData;
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: '회원가입 API',
    description: '회원가입',
  })
  async signup(@Body() signupUserDto: SignupUserDto) {
    return await this.userService.signup(signupUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: '로그인 API',
  })
  @ApiResponse({ description: '로그인에 성공하면 JWT token을 리턴' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }
}

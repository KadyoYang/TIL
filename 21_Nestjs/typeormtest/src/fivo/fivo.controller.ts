import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
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
import { FivoService } from './fivo.service';

@ApiTags('fivo')
@Controller('fivo')
export class FivoController {
  constructor(private readonly fivoService: FivoService) { }

  @Get()
  async getFivoStatus() {
    return await this.fivoService.getFivos();
  }

  @Post()
  async createFivoStatus() {
    this.fivoService.createFivos();
  }

  @Delete()
  async deleteFivos() {
    this.fivoService.deleteFivos();
  }

  @Put()
  async doCalculateFivo() {
    this.fivoService.calculate();
  }
}

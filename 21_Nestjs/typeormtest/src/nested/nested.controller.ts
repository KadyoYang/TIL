import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CalculateParam } from "src/dto/calculateParam";
import { NestedService } from "./nested.service";

@ApiTags("nested")
@Controller("nested")
export class NestedController {
  constructor(private readonly nestedService: NestedService) {}

  @Get()
  async getInfo() {
    return await this.nestedService.getInfo();
  }
}

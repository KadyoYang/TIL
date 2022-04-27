import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Get()
  async hi() {
    // Don't let me leave murph! don't let me leave eaeeee
    return await this.boardService.hello('murphy');
  }
}

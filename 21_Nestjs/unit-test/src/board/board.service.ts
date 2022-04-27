import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddBoardDto } from './dto/add-board.dto';
import { Board } from './entity/board.entity';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class BoardService {
  constructor(
    private readonly postRepository: PostRepository,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async hello(name: string) {
    return `hello ${name}`;
  }

  async addBoard(addBoardDto: AddBoardDto) {
    const newBoard: Board = this.boardRepository.create();
    newBoard.boardName = addBoardDto.name;
    const createdBoard = await this.boardRepository.save(newBoard);
    return createdBoard.id;
  }

  async getBoards() {
    const boards = await this.boardRepository.find({});
    return boards;
  }

  async getPosts(pageIdx: number, pageSize: number, boardId: number) {
    return await this.postRepository.getPosts(pageIdx, pageSize, boardId);
  }
}

import { Test } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardService } from './board.service';
import { AddBoardDto } from './dto/add-board.dto';
import { Board } from './entity/board.entity';
import { PostRepository } from './repository/post.repository';

const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
});

const mockBoardRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: MockRepository<Board>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: PostRepository,
          useValue: mockPostRepository,
        },
        {
          provide: getRepositoryToken(Board),
          useValue: mockBoardRepository(),
        },
      ],
    }).compile();

    boardService = moduleRef.get<BoardService>(BoardService);
    boardRepository = moduleRef.get<MockRepository<Board>>(
      getRepositoryToken(Board),
    );
  });

  //   it.todo('board가 정상적으로 생성되어야함');
  //   it.todo('board가 정상적으로 조회되어야함');
  it('board가 정상적으로 생성되어야함', async () => {
    const boardName = 'this is boardName';
    const addBoardDto = new AddBoardDto();
    addBoardDto.name = boardName;
    boardRepository.create.mockReturnValue(new Board());
    boardRepository.save.mockReturnValue(createNewBoard(1, boardName));

    const result = await boardService.addBoard(addBoardDto);
    expect(result).toBe(1);
  });
  it.todo('board가 정상적으로 조회되어야함');
});

const createNewBoard = (id: number, boardName: string) => {
  const board = new Board();
  board.boardName = boardName;
  board.id = id;

  return board;
};

/*


https://www.youtube.com/watch?v=XbSZnGCJB2I 보고 찾아낸거 
useValue 에 {key:value} 시긍로 들어가야하는데 
그 거기에다 내가 함수명만 서놨지 mockBoardRepository , mockBoardRepository() 요렇게 호출을 안했네 그래서
그 값이 안들어가서 못찾았던거임 음 
 */

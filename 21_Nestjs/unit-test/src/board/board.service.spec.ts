import { Test } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardService } from './board.service';
import { AddBoardDto } from './dto/add-board.dto';
import { Board } from './entity/board.entity';
import { Post } from './entity/post.entity';
import { PostRepository } from './repository/post.repository';

const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  getPosts: jest.fn(),
});

const mockBoardRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
type MockPostRepository = Partial<Record<keyof PostRepository, jest.Mock>>;
describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: MockRepository<Board>;
  let postRepository: MockPostRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: PostRepository,
          useValue: mockPostRepository(),
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
    postRepository = moduleRef.get(PostRepository);
  });

  it('should be defined', () => {
    expect(boardService).toBeDefined();
    expect(boardRepository).toBeDefined();
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
  it('board가 정상적으로 조회되어야함', async () => {
    boardRepository.find.mockReturnValue([
      createNewBoard(1, 'a'),
      createNewBoard(2, 'b'),
    ]);
    const result = await boardService.getBoards();
    expect(result.length).toBe(2);
  });

  it('post가 정상적으로 조회되어야함', async () => {
    postRepository.getPosts.mockReturnValue([
      createNewPost(1, 'hello1', 'content'),
      createNewPost(2, 'hello2', 'content'),
      createNewPost(3, 'hello3', 'content'),
    ]);

    const result = await boardService.getPosts(3, 10, 5);

    expect(result.length).toBe(3);
    console.log(result[1].title);
    expect(postRepository.getPosts).toHaveBeenCalledWith(3, 10, 5);
  });
});

// ####################### util function

const createNewBoard = (id: number, boardName: string) => {
  const board = new Board();
  board.boardName = boardName;
  board.id = id;

  return board;
};

const createNewPost = (id: number, title: string, content: string) => {
  const post = new Post();
  post.content = content;
  post.id = id;
  post.title = title;
  return post;
};

/*
https://www.youtube.com/watch?v=XbSZnGCJB2I 보고 찾아낸거 
useValue 에 {key:value} 시긍로 들어가야하는데 
그 거기에다 내가 함수명만 서놨지 mockBoardRepository , mockBoardRepository() 요렇게 호출을 안했네 그래서
그 값이 안들어가서 못찾았던거임 음 
 */

/*
특정 라이브러리 모킹
import bcrypt from 'bcrypt';

jest.spyOn(bcrypt, 'encodePassword').mockReturnValueOnce('hashed');
expect(bcryptUtils.encodedPassword).toHaveBeenCalledWith('param')
*/

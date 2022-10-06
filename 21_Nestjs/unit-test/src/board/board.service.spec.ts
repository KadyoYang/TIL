import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { makeMockObject, MockObjectType } from './unit';
import { Repository } from 'typeorm';
import { BoardService } from './board.service';
import { AddBoardDto } from './dto/add-board.dto';
import { Board } from './entity/board.entity';
import { Post } from './entity/post.entity';
import { PostRepository } from './repository/post.repository';
import { SomeService } from './some.service';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: MockObjectType<Repository<Board>>;
  let postRepository: MockObjectType<PostRepository>;
  let someService: MockObjectType<SomeService>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BoardService],
    })
      .useMocker((token) => {
        console.log(token);
        if (typeof token === 'string') {
          // typeorm Repository
          return makeMockObject(Repository);
        }
        // typeorm Custom Repository Class
        // Injectable Class
        return makeMockObject(token as any);
      })
      .compile();

    boardService = moduleRef.get<BoardService>(BoardService);
    boardRepository = moduleRef.get(getRepositoryToken(Board));
    postRepository = moduleRef.get(PostRepository);
    someService = moduleRef.get(SomeService);
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
    expect(postRepository.getPosts).toHaveBeenCalledWith(3, 10, 5);
  });

  it('Custom PostRepository Mock 테스트', async () => {
    postRepository.findAndCount.mockReturnValueOnce('hello');
    postRepository.getPosts.mockReturnValueOnce('tototo');
    expect(await postRepository.findAndCount()).toEqual('hello');
    expect(await postRepository.getPosts()).toEqual('tototo');
  });

  it('BoardRepository Mock 테스트', async () => {
    boardRepository.find.mockReturnValueOnce('bbb');
    boardRepository.save.mockReturnValueOnce('ccc');
    expect(await boardRepository.find()).toEqual('bbb');
    expect(await boardRepository.save()).toEqual('ccc');
  });

  it('SomeService Mock 테스트', async () => {
    someService.greetings.mockReturnValueOnce('hi');
    someService.insulting.mockReturnValueOnce('the word');
    expect(await someService.greetings()).toEqual('hi');
    expect(await someService.insulting()).toEqual('the word');
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

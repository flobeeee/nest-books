import { Test } from '@nestjs/testing'
import { BooksController } from './books.controller'
import { BooksService } from './books.service'
import { PostBookDto } from './dto/post-book.dto'

describe('CatsController', () => {
  let booksController: BooksController

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((book: PostBookDto) =>
                Promise.resolve({ id: '1', ...book }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                name: '나무',
                genre: '소설',
              },
              {
                name: '넷플릭스',
                genre: '비즈니스',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: 'firstName #1',
                genre: 'lastName #1',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    booksController = moduleRef.get<BooksController>(BooksController)
  })

  describe('findAll()', () => {
    it('should find all users ', async () => {
      const data = await booksController.cgetAction(null)
      console.log(data)
    })
  })
})

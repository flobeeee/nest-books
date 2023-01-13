import { Test, TestingModule } from '@nestjs/testing'
import { CreateBookDto } from './dto/create-book.dto'
import { BooksController } from './books.controller'
import { BooksService } from './books.service'

const createBookDto: CreateBookDto = {
  name: '클린코드',
  genre: 'IT',
}

const mockService = {
  create: jest
    .fn()
    .mockImplementation((book: CreateBookDto) =>
      Promise.resolve({ id: '1', ...book }),
    ),
  findAll: jest.fn().mockResolvedValue([
    {
      name: '방구석 미술관',
      genre: '예술',
    },
    {
      name: '슬픔의 방문',
      genre: '에세이',
    },
  ]),
  findOne: jest.fn().mockImplementation((id: number) =>
    Promise.resolve({
      name: '클린코드',
      genre: 'IT',
      id,
    }),
  ),
  delete: jest.fn().mockImplementation(() => Promise.resolve({})),
}

describe('BooksController', () => {
  let booksController: BooksController
  let booksService: BooksService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: BooksService,
          useValue: mockService,
        },
      ],
    }).compile()

    booksController = app.get<BooksController>(BooksController)
    booksService = app.get<BooksService>(BooksService)
  })

  it('should be defined', () => {
    expect(booksController).toBeDefined()
  })

  describe('create()', () => {
    it('should create a book', () => {
      booksController.postAction(createBookDto)
      expect(booksController.postAction(createBookDto)).resolves.toEqual({
        id: '1',
        ...createBookDto,
      })
      expect(booksService.create).toHaveBeenCalledWith(createBookDto)
    })
  })

  describe('findAll()', () => {
    it('should find all books ', () => {
      booksController.cgetAction(null)
      expect(booksService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne()', () => {
    it('should find a book', () => {
      expect(booksController.getAction(1)).resolves.toEqual({
        name: '클린코드',
        genre: 'IT',
        id: expect.any(Number),
      })
      expect(booksService.findOne).toHaveBeenCalled()
    })
  })

  describe('delete()', () => {
    it('should remove the user', () => {
      booksController.deleteAction(2)
      expect(booksService.delete).toHaveBeenCalled()
    })
  })
})

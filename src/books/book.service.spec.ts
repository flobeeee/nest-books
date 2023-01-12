import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { Books } from './books.entity'
import { BooksService } from './books.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DatabaseModule } from 'src/database/database.module'

const bookArray = [
  {
    name: '방구석 미술관',
    genre: '예술',
  },
  {
    name: '슬픔의 방문',
    genre: '에세이',
  },
]

const oneBook = {
  name: '방구석 미술관',
  genre: '예술',
}

describe('BookService', () => {
  let service: BooksService
  let repository: Repository<Books>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Books),
          useValue: {
            find: jest.fn().mockResolvedValue(bookArray),
            findOneBy: jest.fn().mockResolvedValue(oneBook),
            save: jest.fn().mockResolvedValue(oneBook),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<BooksService>(BooksService)
    //   repository = module.get<Repository<Books>>(getRepositoryToken(Books))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should successfully insert a book', () => {
      const oneBook = {
        name: '클린코드',
        genre: 'IT',
      }

      expect(
        service.create({
          name: '클린코드',
          genre: 'IT',
        }),
      ).resolves.toEqual(oneBook)
    })
  })

  describe('findAll()', () => {
    it('should return an array of books', async () => {
      const books = await service.findAll(null)
      expect(books).toEqual(bookArray)
    })
  })

  describe('findOne()', () => {
    it('should get a single book', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy')
      expect(service.findOne(1)).resolves.toEqual(oneBook)
      expect(repoSpy).toBeCalledWith({ id: 1 })
    })
  })

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete')
      const retVal = await service.delete(2)
      expect(removeSpy).toBeCalledWith(2)
      expect(retVal).toBeUndefined()
    })
  })
})

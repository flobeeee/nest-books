import { Repository } from 'typeorm'
import { BooksController } from './books.controller'
import { Books } from './books.entity'
import { BooksService } from './books.service'

describe('CatsController', () => {
  let booksController: BooksController
  let booksService: BooksService
  let booksRepository: Repository<Books>

  beforeEach(() => {
    booksService = new BooksService(booksRepository)
    booksController = new BooksController(booksService)
  })

  describe('findAll', () => {
    it('should return an array of books', async () => {
      let result: Promise<Books[]>
      jest.spyOn(booksService, 'findAll').mockImplementation(() => result)

      expect(await booksController.cgetAction(null)).toBe(result)
    })
  })
})

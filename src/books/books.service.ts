import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { Books } from './books.entity'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private booksRepository: Repository<Books>,
  ) {}

  async findAll(filter: CreateBookDto): Promise<Books[]> {
    const searchOption = []

    let books = this.booksRepository.find()

    if (filter) {
      for (const key in filter) {
        if (Object.prototype.hasOwnProperty.call(filter, key)) {
          const obj = {}
          obj[key] = filter[key]
          searchOption.push(obj)
        }
      }

      books = this.booksRepository.find({
        // or 검색 [ { genre: '음악' }, { name: '바이올린' } ]
        // and 검색 [ { genre: '음악', name: '바이올린' } ]
        where: searchOption,
      })
    }

    return books
  }

  async findOne(id: number): Promise<Books> {
    return this.booksRepository.findOneBy({ id })
  }

  async create(PostBookDto: CreateBookDto): Promise<Books> {
    const book = await this.booksRepository.findOneBy({
      name: PostBookDto.name,
    })

    if (book) {
      throw new BadRequestException('BadRequestException', {
        cause: new Error(),
        description: '이미 존재하는 도서명입니다.',
      })
    } else {
      const book = this.booksRepository.create(PostBookDto)
      await this.booksRepository.save(book)

      return book
    }
  }

  async update(id: number, UpdateBookDto: UpdateBookDto): Promise<Books> {
    const sameNameBook = await this.booksRepository.findOneBy({
      name: UpdateBookDto.name,
    })

    if (sameNameBook) {
      throw new BadRequestException('BadRequestException', {
        cause: new Error(),
        description: '이미 존재하는 도서명입니다.',
      })
    }

    const book = await this.booksRepository.findOneBy({
      id: id,
    })

    if (!book) {
      throw new NotFoundException('NotFoundException', {
        cause: new Error(),
        description: '존재하지 않는 도서입니다.',
      })
    }

    book.name = UpdateBookDto.name
    book.genre = UpdateBookDto.genre
    await this.booksRepository.save(book)

    return book
  }

  async delete(id: number) {
    const book = await this.booksRepository.findOneBy({
      id: id,
    })

    if (book) {
      await this.booksRepository.delete(book)
    } else {
      throw new NotFoundException('NotFoundException', {
        cause: new Error(),
        description: '존재하지 않는 도서입니다.',
      })
    }
  }

  async resetTable() {
    await this.booksRepository.clear()

    await this.booksRepository
      .createQueryBuilder()
      .insert()
      .values([
        {
          name: '클린 코드',
          genre: 'IT',
        },
        {
          name: '개미',
          genre: '소설',
        },
        {
          name: '더 해빙',
          genre: '자기개발',
        },
        {
          name: '죽고싶지만 떡볶이는 먹고 싶어',
          genre: '에세이',
        },
        {
          name: '보건교사 안은영',
          genre: '소설',
        },
      ])
      .execute()
  }
}

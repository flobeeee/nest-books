import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Books } from './books.entity'
import { PostBookDto } from './dto/post-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private booksRepository: Repository<Books>,
  ) {}

  async findAll(): Promise<Books[]> {
    return this.booksRepository.find()
  }

  async findOne(id: number): Promise<Books> {
    return this.booksRepository.findOneBy({ id })
  }

  async create(PostBookDto: PostBookDto): Promise<string> {
    this.booksRepository.create(PostBookDto)

    return 'ok'
  }

  async update(id: number, UpdateBookDto: UpdateBookDto): Promise<Books> {
    const book = await this.booksRepository.findOneBy({
      id: id,
    })

    book.name = UpdateBookDto.name
    book.genre = UpdateBookDto.genre
    await this.booksRepository.save(book)

    return book
  }
}

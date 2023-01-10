import { DataSource } from 'typeorm'
import { Books } from './books.entity'

export const booksProviders = [
  {
    provide: 'BOOKS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Books),
    inject: ['DATA_SOURCE'],
  },
]

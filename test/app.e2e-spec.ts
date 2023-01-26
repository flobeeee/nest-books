import { HttpStatus } from '@nestjs/common'
import { CreateBookDto } from 'src/books/dto/create-book.dto'
import { UpdateBookDto } from 'src/books/dto/update-book.dto'
import * as request from 'supertest'

describe('BooksController (e2e)', () => {
  const authUrl = `http://localhost:3000`
  let bookId: number

  const mockBook: CreateBookDto = {
    name: '빠르게 실패하기',
    genre: '자기개발',
  }

  // ! test DB에서만 테스트 실행 & 데이터 테스트 할 DB 필수 변경
  if (process.env.NODE_ENV === 'test') {
    describe('/books (Get)', () => {
      it('cget Books', () => {
        return request(authUrl)
          .get('/books')
          .expect((response: request.Response) => {
            const data = response.body

            data.forEach((item: any) => {
              // console.log('item', item)
              expect.objectContaining(item)
              expect(item).toHaveProperty('id')
              expect(item).toHaveProperty('name')
              expect(item).toHaveProperty('genre')
            })
          })
          .expect(HttpStatus.OK)
      })
    })

    describe('/books (POST)', () => {
      it('add a book', () => {
        return request(authUrl)
          .post('/books')
          .send(mockBook)
          .expect((response: request.Response) => {
            const { id, name, genre } = response.body
            bookId = id

            expect(typeof id).toBe('number'),
              expect(name).toEqual(mockBook.name),
              expect(genre).toEqual(mockBook.genre)
          })
          .expect(HttpStatus.CREATED)
      })
    })

    describe('/books/{id} (GET)', () => {
      it('get the book', () => {
        return request(authUrl)
          .get(`/books/${bookId}`)
          .expect((response: request.Response) => {
            const { id, name, genre } = response.body

            expect(id).toEqual(bookId),
              expect(name).toEqual(mockBook.name),
              expect(genre).toEqual(mockBook.genre)
          })
          .expect(HttpStatus.OK)
      })
    })

    describe('/books/{id} (PUT)', () => {
      it('update the book', () => {
        if (bookId) {
          const mockBook1: UpdateBookDto = {
            id: bookId,
            name: '빠르게 성공하기',
            genre: '자기개발',
          }

          return request(authUrl)
            .put(`/books/${bookId}`)
            .send(mockBook1)
            .expect((response: request.Response) => {
              const { id, name, genre } = response.body

              expect(id).toEqual(bookId),
                expect(name).toEqual(mockBook1.name),
                expect(genre).toEqual(mockBook1.genre)
            })
            .expect(HttpStatus.OK)
        }
      })
    })

    describe('/books/{id} (DELETE)', () => {
      it('delete the book', () => {
        if (bookId) {
          return request(authUrl)
            .delete(`/books/${bookId}`)
            .expect(HttpStatus.NO_CONTENT)
        }
      })
    })
  }
})

import { HttpStatus } from '@nestjs/common'
import * as request from 'supertest'

describe('BooksController (e2e)', () => {
  const authUrl = `http://localhost:3000`

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
})

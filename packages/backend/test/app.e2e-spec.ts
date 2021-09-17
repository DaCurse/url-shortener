import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { LinkDTO } from '../src/link/link.dto';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    setTimeout(() => app.close(), 100);
  });

  describe('LinkModule', () => {
    describe('POST /link/create, GET /:code', () => {
      it('should create new link and redirect to url', async () => {
        const dto: LinkDTO = {
          url: 'http://example.com',
        };
        const res = await request(app.getHttpServer())
          .post('/link/create')
          .send(dto)
          .expect(201);
        expect(res.body).toEqual({
          ...dto,
          id: expect.any(Number),
          code: expect.any(String),
        });

        const link = res.body;
        await request(app.getHttpServer())
          .get(`/${link.code}`)
          .expect(302)
          .expect('Location', link.url);
      });
    });
  });
});

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { LinkDTO } from '../src/link/link.dto';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('LinkModule', () => {
    describe('POST /link/create', () => {
      it('should create a link', async () => {
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
          visitCount: 0,
        });
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Entry } from '../src/entries/schemas/entry.schema';
import { User } from '../src/users/schemas/user.schema'; // Importa también User
import { vi } from 'vitest';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  const mockModel = {
    find: vi.fn(),
    create: vi.fn(),
    exec: vi.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(MongooseModule)
      .useModule(MongooseModule.forRoot('mongodb://mock/database'))
      .overrideProvider(getModelToken(Entry.name))
      .useValue(mockModel)
      .overrideProvider(getModelToken(User.name))
      .useValue(mockModel)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

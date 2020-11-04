import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {AppService} from "../src/app.service";

describe('Different data scenario', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
  });

  it('only prefix', async () => {
    // @ts-ignore
    jest.spyOn(app.get<AppService>(AppService), 'loadData').mockImplementationOnce(() => 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    await app.init();

    return request(app.getHttpServer())
      .get('/genes/find/AAAAAAAAAAAAAAAAAA')
      .expect(200)
      .expect({ status: 'Success', message: 'Found' });
  });

  it('no prefix - gen searched is prefix only', async () => {
    // @ts-ignore
    jest.spyOn(app.get<AppService>(AppService), 'loadData').mockImplementationOnce(() => 'GGGGGGGGGGGG')
    await app.init();

    return request(app.getHttpServer())
      .get('/genes/find/AAAAAAAAAAA')
      .expect(200)
  });

  it('double prefix', async () => {
    // @ts-ignore
    jest.spyOn(app.get<AppService>(AppService), 'loadData').mockImplementationOnce(() => 'AAAAAAAAAAAAAAAAAGC')
    await app.init();

    return request(app.getHttpServer())
      .get('/genes/find/AAAAAAAAAAAGC')
      .expect(200)
  });

  it('no prefix', async () => {
    // @ts-ignore
    jest.spyOn(app.get<AppService>(AppService), 'loadData').mockImplementationOnce(() => 'GGGGGGGGGGGG')
    await app.init();

    return request(app.getHttpServer())
      .get('/genes/find/AAAAAAAAAAAA')
      .expect(404)
  });

});

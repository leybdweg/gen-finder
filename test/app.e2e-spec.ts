import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Basic tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('success flow', () => {
    return request(app.getHttpServer())
      .get('/genes/find/AAAAAAAAAAAGCGCGCTTAGGAAGAC')
      .expect(200)
      .expect({ status: 'Success', message: 'Found' });
  });

  it('success flow - not found', () => {
    return request(app.getHttpServer())
      .get('/genes/find/AAAAAAAAAAAGGGGGG')
      .expect(404)
      .expect({ status: 'Success', message: 'Not found' });
  });

  it('w/o prefix', () => {
    return request(app.getHttpServer())
      .get('/genes/find/BCD')
      .expect(400)
      .expect({"status":"Failed","message":"Gen provided doesn't have correct prefix"});
  });
});

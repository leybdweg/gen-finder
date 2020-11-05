import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Unexpected input', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('input not allowed ', async () => {
    // TODO: consider if such a case is allowed
    return request(app.getHttpServer())
      .get('/genes/find/AAAAAAAAAAAGCGCGCTTAGGAAGACGTTAGCTACATGCAAAAAAAAAAAGCTTTTTTGGCTC')
      .expect(404)
  });


});

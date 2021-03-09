import mongoose from 'mongoose';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from '../../app';

let mongoServer = new MongoMemoryServer();

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const agent = request.agent(app);

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('notes router', () => {
  describe('POST /notes', () => {
    it('should store a new note', (done) => {
      agent
        .post('/api/notes')
        .send({ title: 'Title', content: 'Content' })
        .expect(201)
        .then((res) => {
          expect(res.body._id).toBeTruthy();
          expect(res.body.title).toEqual('Title');
          done();
        });
    });

    it('should not post a note with a matching title', (done) => {
      agent
        .post('/api/notes')
        .send({ title: 'Title', content: 'Content' })
        .expect(500)
        .then(() => {
          done();
        });
    });
  });

  describe('GET /notes', () => {
    it('should get notes', (done) => {
      agent
        .get('/api/notes')
        .expect(200)
        .then((res) => {
          expect(res.body).toBeTruthy();
          expect(res.body).toHaveLength(1);
          expect(res.body[0].title).toEqual('Title');
          done();
        });
    });
  });
});

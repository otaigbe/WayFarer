import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the create trips Endpoint', () => {
  describe('Testing the create trip Endpoint', () => {
    it('should create a new trip successfully', async () => {
      const res = await chai.request(app).post('/api/v1/trips').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJmaXJzdG5hbWUiOiJtYWNobyIsImlzYWRtaW4iOnRydWUsImVtYWlsIjoibGlub0BnbS5jb20iLCJpYXQiOjE1NjE3MDUwMjh9.-KMTYqYKJTTIkm_Xo67KINlK8Q6ZMQItENkfskyWX8E').type('form')
        .send({
          busid: 1,
          origin: 'togo',
          tripdate: '2019-07-25',
          destination: 'ghana',
          fare: '25000',
          status: 'active',
        });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
    });

    it('should return a validation error', async () => {
      const res = await chai.request(app).post('/api/v1/trips').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJmaXJzdG5hbWUiOiJtYWNobyIsImlzYWRtaW4iOnRydWUsImVtYWlsIjoibGlub0BnbS5jb20iLCJpYXQiOjE1NjE3MDUwMjh9.-KMTYqYKJTTIkm_Xo67KINlK8Q6ZMQItENkfskyWX8E').type('form')
        .send({
          busid: 9886,
          origin: 'togo',
          tripdate: '2019-07-25',
          destination: 'ghana',
          fare: '25000',
          status: 'bad',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });

    it('should return an already existent trip message', async () => {
      const res = await chai.request(app).post('/api/v1/trips').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJmaXJzdG5hbWUiOiJtYWNobyIsImlzYWRtaW4iOnRydWUsImVtYWlsIjoibGlub0BnbS5jb20iLCJpYXQiOjE1NjE3MDUwMjh9.-KMTYqYKJTTIkm_Xo67KINlK8Q6ZMQItENkfskyWX8E').type('form')
        .send({
          busid: 1,
          origin: 'togo',
          tripdate: '2019-07-25',
          destination: 'ghana',
          fare: '25000',
          status: 'active',
        });
      expect(res).to.have.status(409);
      expect(res.body).to.have.property('status');
    });

    it('should return a 401 error no token', async () => {
      const res = await chai.request(app).post('/api/v1/trips').set('x-auth-token', '').type('form')
        .send({
          busid: 987789086,
          origin: 'togo',
          tripdate: '2019-07-25',
          destination: 'ghana',
          fare: '25000',
          status: 'active',
        });
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
    });

    it('should return a 401 error unauthorized user', async () => {
      const res = await chai.request(app).post('/api/v1/trips').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InN0YW5AZ20uY29tIiwiZmlyc3RuYW1lIjoic3RhbiIsImlzYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjE3NjYxMTF9.aK-kWxpW9gDWGbDyo26M11QTbic1op4x8OKQX_OZzDQ').type('form')
        .send({
          busid: 987789086,
          origin: 'togo',
          tripdate: '2019-07-25',
          destination: 'ghana',
          fare: '25000',
          status: 'active',
        });
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
    });

    it('should return a 400 error invalid token', async () => {
      const res = await chai.request(app).post('/api/v1/trips').set('x-auth-token', 'eyJhbGciOiJIUiouizI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InN0YW5AZ20uY29tIiwiZmlyc3RuYW1lIjoic3RhbiIsImlzYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjE3NjYxMTF9.aK-kWxpW9gDWGbDyo26M11QTbic1op4x8OKQX_OZzDQ').type('form')
        .send({
          busid: 987789086,
          origin: 'togo',
          tripdate: '2019-07-25',
          destination: 'ghana',
          fare: '25000',
          status: 'active',
        });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
  });

  describe('Testing the get all trips method', () => {
    it('should retrieve trips successfully', async () => {
      const res = await chai.request(app).get('/api/v1/trips').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6Imxpbm9AZ20uY29tIiwiZmlyc3RuYW1lIjoibWFjaG8iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1NjE3OTAwMTZ9.yk9Fa2KD2d2UxoGLmeiXUd_qMt0HyVuiYXnxF9BLGzM');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
    });

    it('should retrieve trips successfully by setting a page number and quantity per page', async () => {
      const res = await chai.request(app).get('/api/v1/trips?page=1&quantity=3').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6Imxpbm9AZ20uY29tIiwiZmlyc3RuYW1lIjoibWFjaG8iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1NjE3OTAwMTZ9.yk9Fa2KD2d2UxoGLmeiXUd_qMt0HyVuiYXnxF9BLGzM');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
    });

    it('should return a validation error', async () => {
      const res = await chai.request(app).get('/api/v1/trips?page=cow&quantity=3').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6Imxpbm9AZ20uY29tIiwiZmlyc3RuYW1lIjoibWFjaG8iLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE1NjE3OTAwMTZ9.yk9Fa2KD2d2UxoGLmeiXUd_qMt0HyVuiYXnxF9BLGzM');
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
    });
  });
});

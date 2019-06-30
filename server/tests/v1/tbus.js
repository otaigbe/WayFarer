import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the register bus Endpoint', () => {
  it('should register a new bus successfully', async () => {
    const res = await chai.request(app).post('/api/v1/buses').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJmaXJzdG5hbWUiOiJtYWNobyIsImlzYWRtaW4iOnRydWUsImVtYWlsIjoibGlub0BnbS5jb20iLCJpYXQiOjE1NjE3MDUwMjh9.-KMTYqYKJTTIkm_Xo67KINlK8Q6ZMQItENkfskyWX8E').type('form')
      .send({
        platenumber: 're456yu',
        manufacturer: 'iuoiui',
        model: 'uiyiuhi',
        capacity: 18,
        year: 2019,
        vinnumber: '87yg6898h8690',
      });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('data');
  });

  it('should throw a conflict error ie already existent bus', async () => {
    const res = await chai.request(app).post('/api/v1/buses').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJmaXJzdG5hbWUiOiJtYWNobyIsImlzYWRtaW4iOnRydWUsImVtYWlsIjoibGlub0BnbS5jb20iLCJpYXQiOjE1NjE3MDUwMjh9.-KMTYqYKJTTIkm_Xo67KINlK8Q6ZMQItENkfskyWX8E').type('form')
      .send({
        platenumber: 're456yu',
        manufacturer: 'iuoiui',
        model: 'uiyiuhi',
        capacity: 18,
        year: 2019,
        vinnumber: '43544err4534tgh',
      });
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('status');
  });

  it('throw an unauthorized user error', async () => {
    const res = await chai.request(app).post('/api/v1/buses').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InN0YW5AZ20uY29tIiwiZmlyc3RuYW1lIjoic3RhbiIsImlzYWRtaW4iOmZhbHNlLCJpYXQiOjE1NjE5MTc4MzB9.VkET_WPAIU50EyBalTtCBYcxhsrSokzm3EPj2j6B4TQ').type('form')
      .send({
        platenumber: 'qw464lj',
        manufacturer: 'iuoiui',
        model: 'uiyiuhi',
        capacity: 17,
        year: 2019,
        vinnumber: '87009094e',
      });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('status');
  });

  it('should throw a validation Error', async () => {
    const res = await chai.request(app).post('/api/v1/buses').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJmaXJzdG5hbWUiOiJtYWNobyIsImlzYWRtaW4iOnRydWUsImVtYWlsIjoibGlub0BnbS5jb20iLCJpYXQiOjE1NjE3MDUwMjh9.-KMTYqYKJTTIkm_Xo67KINlK8Q6ZMQItENkfskyWX8E').type('form')
      .send({
        platenumber: 're856trt',
        manufacturer: 'iuoiui',
        model: 'uiyiuhi',
        capacity: 18,
        year: 2019,
        vinnumber: '',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
  });
});

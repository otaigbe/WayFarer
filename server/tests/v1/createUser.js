import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the create user Endpoint', () => {
  it('should create a new account as Admin successfully', async () => {
    const res = await chai.request(app).post('/api/v1/auth/signup/').type('form').send({
      firstname: 'stanley',
      lastname: 'okhueleigbe',
      password: 'piloting',
      email: 'stanlex4400@gmail.com',
      isadmin: 'true',
    });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('data');
  });

  it('should create a new account as a normal user successfully', async () => {
    const res = await chai.request(app).post('/api/v1/auth/signup/').type('form').send({
      firstname: 'osas',
      lastname: 'edobor',
      password: 'piloting',
      email: 'osas0@test.com',
      isadmin: 'false',
    });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('data');
  });

  it('should return a validation error', async () => {
    const res = await chai.request(app).post('/api/v1/auth/signup/').type('form').send({
      username: Number(34564),
      firstname: 'otaigbe',
      lastname: 'okhueleigbe',
      password: '',
      email: 'stanlex4400@gmail.com',
      isadmin: true,
    });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
  });

  it('should return an already existent user message', async () => {
    const res = await chai.request(app).post('/api/v1/auth/signup/').type('form').send({
      firstname: 'stanley',
      lastname: 'okhueleigbe',
      password: 'piloting',
      email: 'stanlex4400@gmail.com',
      isadmin: 'true',
    });
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('status');
  });
});

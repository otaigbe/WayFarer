import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);


describe('Testing the signin method', () => {
  it('should sign in a user successfully', async () => {
    const res = await chai.request(app).post('/api/v1/auth/signin').type('form').send({
      email: 'stanlex4400@gmail.com',
      password: 'piloting',
    });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
  });

  it('should throw a 404 signifying that email not found', async () => {
    const res = await chai.request(app).post('/api/v1/auth/signin').type('form').send({
      email: 'fanta@epicmail.com',
      password: 'password',
    });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });

  it('should return a validation error', async () => {
    const res = await chai.request(app).post('/api/v1/auth/signin/').type('form').send({
      email: 'otaigbe@epicmail.com',
      password: '',
    });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });

  it('should return an invalid username/password error message', async () => {
    const res = await chai.request(app).post('/api/v1/auth/signin/').type('form').send({
      email: 'stanlex4400@gmail.com',
      password: 'piloti',
    });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('error');
  });
});

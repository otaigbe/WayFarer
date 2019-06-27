import express from 'express';
import conf from 'dotenv';
import winston from 'winston';
import '@babel/polyfill';
import endpoints from './routes/v1/index';

conf.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./UI'));

app.use('/', endpoints);

let port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT;
}

const server = app.listen(port, () => { winston.info(`app running on ${port}...`); });
export default server;

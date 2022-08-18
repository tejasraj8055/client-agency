import express from 'express';
const app = express();
import 'dotenv/config';
import connectDB from './config/db.js';
import logger from './utils/logger.js';
import authRouter from './routes/auth.js';
import clientAgencyAPIRouter from './routes/clientAgencyAPI.js';
import clientCrudRouter from './routes/crud/clientCrud.js';
import agencyCrudRouter from './routes/crud/agencyCrud.js';

app
  .use(express.json())
  .use(logger)
  .get('/', (req, res, next) => {
    res.status(200).send('Kindly follow API documentation "https://documenter.getpostman.com/view/22664905/VUjLMT24" ');
  })
  .use('/auth', authRouter)
  .use('/clientAgency', clientAgencyAPIRouter)
  .use('/client', clientCrudRouter)
  .use('/agency', agencyCrudRouter)
  .use((err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'Internal server error';
    res.status(err.status).send({ success: false, message: err.message });
  })
  .listen(process.env.PORT || 5000, async () => {
    console.log('Server up and running');
    await connectDB();
  });

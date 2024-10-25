import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './src/utils/env.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { notFoundHandler } from './src/middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import router from './src/routers/index.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    })
  );
  app.use(cors());
  app.use(cookieParser());
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   })
  // );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world ^_^',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);
};

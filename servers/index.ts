import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import jobRouter from './job-api/routes/jobRoutes';
import db from './db/mongoose';

import validator from './validator/index';

// connection à la DB
db.connect();

/****************/
/*** JOB API ***/
/**************/
const jobAPI = express();

//middlewares
jobAPI.use(express.urlencoded({ extended: true }));
jobAPI.use(express.json());

// CORS
jobAPI.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// routes
jobAPI.use('/api/jobs', jobRouter);
jobAPI.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => res.status(400).json(err));

// server listening...
jobAPI.listen(3001, () => {
  console.log('Job-api is running on port 3001');
});

/****************/
/*** VALIDATOR ***/
/**************/
validator();

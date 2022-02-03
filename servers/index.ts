import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import jobRouter from './job-api/routes/jobRoutes'
import db from './db/mongoose';

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
  next();
});

// routes
jobAPI.use('/api/jobs', jobRouter);
jobAPI.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => res.status(400).json(err));

// server listening...
jobAPI.listen(3001, () => {
  console.log('Job-api is running on port 3001');
});


/******************/
/*** VALIDATOR ***/
/****************/
const validator = express();

//middlewares
validator.use(express.urlencoded({ extended: true }));
validator.use(express.json());

// CORS
validator.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// routes
validator.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => res.status(400).json(err));

// server listening...
validator.listen(3002, () => {
  console.log('Validator is running on port 3002');
});

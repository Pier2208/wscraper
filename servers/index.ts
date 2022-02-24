import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import jobRouter from './job-api/routes/jobRoutes';
import db from './db/mongoose';
import validator from './validator/index';
import path from 'path';

// Express app
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../..', 'client/dist/client')));

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// routes
app.use('/api/jobs', jobRouter);
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => res.status(400).json(err));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../..', 'client/dist/client/index.html'));
});

app.listen(3001, async () => {
  console.log('Server is running on port 3001');
  // start mongoDB
  db.connect();
  // start the url validator in the background
  validator();
});

import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser'
import jobRouter from './job-api/routes/jobRoutes';
import db from './db/mongoose';
import path from 'path';

// Express app
const app = express();

//middlewares
//app.use(express.urlencoded({ limit: '200mb', extended: true }));
//app.use(express.json({limit: '200mb'}));
app.use(bodyParser.json({limit: '200mb', type:'application/json'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true, parameterLimit:50000 }));
app.use(express.static(path.join(__dirname, '..', 'dist')));

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
  res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
});

app.listen(3001, async () => {
  console.log('Server is running on port 3001');
  // start mongoDB
  db.connect();
})

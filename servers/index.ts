import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import http from 'http';
import socket from 'socket.io';
import jobRouter from './job-api/routes/jobRoutes';
import db from './db/mongoose';
import validator from './validator/index';
import { Job } from './job-api/models/job.model';

let updates: any;

// Express app
const app = express();

// socket.io
const server = http.createServer(app);
const io = new socket.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
  }
});
io.listen(3003)

io.on('connection', socket => {
  updates.on('change', (next: any) => {
      io.emit('updatedJob', next.fullDocument)
    });
})

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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


app.listen(3001, async () => {
  console.log('Server is running on port 3001');
  // start mongoDB
  db.connect();
  // start the url validator in the background
  validator();

  // listening to jobs collection
 updates = Job.watch(
    [
      {
        $match: {
          operationType: 'update'
        }
      }
    ],
    { fullDocument: 'updateLookup' }
  )
});

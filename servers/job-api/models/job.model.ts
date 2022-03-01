import { Model, Schema, Document, model } from 'mongoose';

interface Url {
  url: string;
  responseTime?: Number;
  statusCode?: Number;
  status: String;
}

export interface IJob extends Document {
  name: string;
  status: string;
  urls: Url[];
  count: Number;
  urlsToDo: Number;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    status: {
      type: String,
      default: 'QUEUED', // 'IN PROGRESS', 'ERROR', 'DONE'
      required: true
    },
    count: Number,
    urls: {
      type: [{ url: String, status: { type: String, default: 'QUEUED' }, statusCode: Number, responseTime: Number }],
      required: true
    },
    urlsToDo: Number
  },
  { timestamps: true }
);

export const Job: Model<IJob> = model('Job', JobSchema);

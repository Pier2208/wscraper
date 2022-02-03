import { Model, Schema, Document, model } from 'mongoose';

interface Url {
  url: string;
  responseTime?: Number;
  statusCode?: Number;
  status: String;
}

export interface IJob extends Document {
  title: string;
  status: string;
  urls: Url[];
  count: Number;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    title: {
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
      type: [{ url: String, status: { type: String, default: 'QUEUED' } }],
      required: true
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Job: Model<IJob> = model('Job', JobSchema);

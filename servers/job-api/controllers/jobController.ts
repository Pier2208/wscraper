import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Job } from '../models/job.model';

interface Url {
  url: string;
  responseTime?: Number;
  statusCode?: Number;
}

export default {
  createJob: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { title, urls } = req.body;
      const newUrls = urls.split(',').reduce((acc: Url[], url: string) => {
        acc.push({ url });
        return acc;
      }, []);

      // save new job in the database
      const job = await new Job({ title, urls: newUrls, count: newUrls.length }).save();

      res.status(200).json(job);
    } catch (err) {
      next(err);
    }
  },
  deleteJob: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // string to ObjectId
      const id = new mongoose.Types.ObjectId(req.params.jobId);

      const result = await Job.deleteOne({ _id: id });

      if (result) res.status(200).json({ success: true });
      else res.status(404).json({ success: 'Document not found' });
    } catch (err) {
      next(err);
    }
  }
};

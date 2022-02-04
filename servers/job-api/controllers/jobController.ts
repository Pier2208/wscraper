import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Job } from '../models/job.model';

interface Url {
  url: string;
  responseTime?: Number;
  statusCode?: Number;
}

export default {
  /**
   * Créer un nouveau job
   */
  createJob: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, urls } = req.body;
      const newUrls = urls.split(',').reduce((acc: Url[], url: string) => {
        acc.push({ url });
        return acc;
      }, []);

      // save new job in the database
      const job = await new Job({ name, urls: newUrls, count: newUrls.length }).save();

      res.status(200).json(job);
    } catch (err) {
      next(err);
    }
  },
  /**
   * Supprimer un job par Id
   */
  deleteJob: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.jobId); // string to ObjectId

      const result = await Job.deleteOne({ _id: id });

      if (result) res.status(200).json({ success: true });
      else res.status(404).json({ success: 'Document not found' });
    } catch (err) {
      next(err);
    }
  },
  /**
   * Récupérer tous les jobs
   */
  getJobs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobs = await Job.find({});
      res.status(200).json(jobs);
    } catch (err) {
      next(err)
    }
  }
};

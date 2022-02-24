import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { stringify } from 'csv-stringify';
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
      const job = await new Job({ name, count: newUrls.length, urls: newUrls }).save();

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
      else res.status(404).json({ success: false });
    } catch (err) {
      next(err);
    }
  },
  /**
   * Récupérer tous les jobs
   */
  getJobs: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.query.page && req.query.size) {
        const page = +req.query.page;
        const size = +req.query.size;

        const jobs = await Job.find({}, '_id name status count createdAt updatedAt')
          .sort({ createdAt: -1 })
          .skip(size * (page - 1))
          .limit(size);

        const count = await Job.count();

        return res.status(200).json({ count, jobs });
      }
    } catch (err) {
      next(err);
    }
  },

  /**
   * Récupérer toutes les urls d'un job
   */
  getUrlsByJobId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.query.scrolled) {
        const scrolled = +req.query.scrolled;
        const id = new mongoose.Types.ObjectId(req.params.jobId); // string to ObjectId
        const job = await Job.findById(id, { urls: { $slice: [0, scrolled] } });
        //const job = await Job.findById(id)

        if (job) res.status(200).json(job);
      }
    } catch (err) {
      next(err);
    }
  },

  downloadFile: async (req: Request, res: Response, next: NextFunction) => {
    // get jobID
    const id = new mongoose.Types.ObjectId(req.params.jobId); // string to ObjectId
    // get selected fields
    let fields = req.body.formData.join(' urls.');
    // fetch the job and the selected fields
    const job = await Job.findById(id, `urls.${fields}`)

    if (job) {
      return res.status(200).json(job.urls);
    }
  }
};

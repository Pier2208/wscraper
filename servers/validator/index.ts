import fetch from 'node-fetch';
import express from 'express';
import { getDurationInMilliseconds } from '../utils/timer';
import { Job } from '../job-api/models/job.model';

/******************/
/*** VALIDATOR ***/
/****************/

export default () => {
  const validator = express();

  // server listening...
  validator.listen(3002, () => {
    console.log('Validator is running on port 3002');
  });

  async function fetchJobs() {
    // METTRE LES JOBS QUEUED --> IN PROGRESS
    await Job.updateMany({ status: 'QUEUED' }, { status: 'IN PROGRESS' });

    // SI LE JOB EST IN PROGRESS, PRENDRE CHAQUE URL, METTRE A IN PROGRESS ET VALIDER
    const filter = { status: 'IN PROGRESS' };
    let inProgressJobs = await Job.aggregate([{ $match: filter }]);

    inProgressJobs.forEach(async job => {
      job.urls.forEach(async (url: any) => {
        if (url.status === 'QUEUED') {
          // METTRE LE SCRAP DE L'URL A IN PROGRESS
          await Job.updateOne(
            { 'urls._id': url._id },
            {
              $set: {
                'urls.$.status': 'IN PROGRESS'
              }
            }
          );

          // VALIDER L'URL
          const response = await checkUrl(url.url);
          console.log('response', response);

          if (response) {
            // METTRE LE SCRAP DE L'URL À DONE ET AJOUTER VALIDAION DATA
            await Job.updateOne(
              { 'urls._id': url._id },
              {
                $set: {
                  'urls.$.status': 'DONE',
                  'urls.$.statusCode': response.statusCode,
                  'urls.$.responseTime': response.responseTime
                }
              }
            );
          }
        }
      });

      // METTRE LA JOB A COMPLETE
      await Job.updateOne({ _id: job._id }, { $set: { status: 'DONE' } });
    });
  }

  setTimeout(() => setInterval(fetchJobs, 5000), 40000);

  async function checkUrl(url: string) {
    const start = process.hrtime();

    try {
      const urlResponse = await fetch(url);
      const durationInMilliseconds = getDurationInMilliseconds(start);

      let response: { url: string; statusCode: Number; responseTime: Number } = {
        url,
        statusCode: urlResponse.status,
        responseTime: durationInMilliseconds
      };

      return response;
    } catch (err: any) {
      const durationInMilliseconds = getDurationInMilliseconds(start);
      err.url = url;
      err.responseTime = durationInMilliseconds;
      err.statusCode = 404;
      return err;
    }
  }
};

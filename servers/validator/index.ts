import fetch from 'node-fetch';
import { Job } from '../job-api/models/job.model';

/******************/
/*** VALIDATOR ***/
/****************/

export default () => {
  async function fetchJobs() {
    // METTRE LES JOBS QUEUED --> IN PROGRESS
    await Job.updateMany({ status: 'QUEUED' }, { $set: { status: 'IN PROGRESS' } });

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

          if (response) {
            // METTRE LE SCRAP DE L'URL À DONE + retirer 1 au compte des urls à faire ET AJOUTER VALIDAION DATA
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

            await Job.updateOne(
              { _id: job._id },
              {
                $inc: {
                  urlsToDo: -1
                }
              }
            );
          }
        }
      });

      // METTRE LA JOB A COMPLETE
      if (job.urlsToDo.length === 0) await Job.updateOne({ _id: job._id }, { $set: { status: 'DONE' } });
    });
  }

  setInterval(fetchJobs, 10000);

  async function checkUrl(url: string) {
    const startTime = new Date().valueOf();

    try {
      const urlResponse = await fetch(url);
      const endTime = new Date().valueOf();
      const diff = endTime - startTime;

      let response: { url: string; statusCode: Number; responseTime: Number } = {
        url,
        statusCode: urlResponse.status,
        responseTime: diff
      };

      return response;
    } catch (err: any) {
      const endTime = new Date().valueOf();
      const diff = endTime - startTime;
      err.url = url;
      err.responseTime = diff;
      err.statusCode = 404;
      return err;
    }
  }
};

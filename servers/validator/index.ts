import fetch from 'node-fetch';
import { Job } from '../job-api/models/job.model';
import db from '../db/mongoose';

/******************/
/*** VALIDATOR ***/
/****************/

console.info('Stating validator');
db.connect();

async function fetchJobs() {
  // Update toutes les jobs dont le status est 'QUEUED' à 'IN PROGRESS'
  await Job.updateMany({ status: 'QUEUED' }, { $set: { status: 'IN PROGRESS' } });

  // On récupére toutes les jobs dont le status est 'IN PROGRESS'
  let inProgressJobs = await Job.aggregate([{ $match: { status: 'IN PROGRESS' } }]);

  // Pour chaque job 'IN PROGRESS'....
  inProgressJobs.forEach(async job => {
    console.log('job in progress', job);
    // Si on a des urls qui restent à être validées...
    if (job.urlsToDo > 0) {
      // pour chaque url à valider, on vérifie que son status est 'QUEUED'
      job.urls.forEach(async (url: any) => {
        if (url.status === 'QUEUED') {
          // et on update son status à 'IN PROGRESS'
          await Job.updateOne(
            { 'urls._id': url._id },
            {
              $set: {
                'urls.$.status': 'IN PROGRESS'
              }
            }
          );

          // puis on lance la validation de l'url
          console.info('Validating ' + url.url);
          const response = await checkUrl(url.url);
          console.log('response', response);

          if (response) {
            // quand l'url est validée, on change son status à 'DONE' et on ajoute les meta données (statusCode et responseTime)
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

            // on décrémente le total des urls qui restent à valider de -1
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
    } else {
      // si la propriété job.urlsToDo === 0, alors toutes les urls sont validées et la job peut être mise à 'DONE'
      await Job.updateOne({ _id: job._id }, { $set: { status: 'DONE' } });
    }
  });
}

setInterval(fetchJobs, 10000);

async function checkUrl(url: string) {
  const startTime = new Date().valueOf();

  try {
    let urlResponse = await fetch(url, { redirect: 'manual' }); //TODO : setup a timeout

    if (urlResponse.status === 301 || urlResponse.status === 302) {
      const locationURL = new URL(urlResponse.url);
      urlResponse = await fetch(locationURL, { redirect: 'manual' });
      console.dir('redirection', urlResponse);
    }
    console.log('response in checkUrl', urlResponse);

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
    err.statusCode = 404; //TODO use http response code
    console.error(JSON.stringify(err));
    return err;
  }
}

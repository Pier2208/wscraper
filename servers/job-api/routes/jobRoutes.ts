import { Router } from 'express';
const router = Router();

// controllers
import jobController from '../controllers/jobController';

// middlewares
import joi from '../middlewares/validate';
const { validateBody, schemas } = joi;

//@ POST api/jobs
//@ Desc Add a new job
router.post('/', validateBody(schemas.jobSchema), jobController.createJob);

//@ DELETE api/jobs/:jobId
//@ Desc Delete a job
router.delete('/:jobId', jobController.deleteJob);

//@ GET api/jobs?page=1&size=5
//@ Desc Get jobs (defaut: 5 jobs per page)
router.get('/', jobController.getJobs);

//@ GET api/jobs/:jobId/urls?scrolled=10
//@ Desc Get the urls from a job
router.get('/:jobId/urls', jobController.getUrlsByJobId);

export default router;

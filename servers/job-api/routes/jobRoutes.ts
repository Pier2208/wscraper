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

export default router;

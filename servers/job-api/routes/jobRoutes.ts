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

export default router;

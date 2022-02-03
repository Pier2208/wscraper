import { Router } from 'express';
const router = Router();

// controllers
import jobController from '../controllers/jobController';

// middlewares
import joi from '../middlewares/validate';
const { validateBody, schemas } = joi;

//@ POST api/jobs
//@ Desc Add a new job
//@ PRIVATE route
router.post('/', validateBody(schemas.jobSchema), jobController.createJob);

export default router;

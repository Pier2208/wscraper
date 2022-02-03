import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

// rules
const title = Joi.string().max(150).required().messages({
  'string.max': 'title should be less than 150 characters',
  'string.empty': 'title is a required field',
  'any.required': 'title is a required field'
});
const urls = Joi.string().required().messages({
  'string.empty': 'url is a required field',
  'any.required': 'url is a required field'
});

interface IError {
  field: string | number;
  error: string;
}

export default {
  schemas: {
    jobSchema: Joi.object().keys({
      title,
      urls
    })
  },
  validateBody: (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      let errors: IError[] = [];
      error.details.forEach(error => {
        errors.push({
          field: error.path[0],
          error: error.message
        });
      });
      next(errors);
    }
    next();
  }
};

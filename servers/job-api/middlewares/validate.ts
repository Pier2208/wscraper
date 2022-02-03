import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

// rules
const name = Joi.string().max(150).required().messages({
  'string.max': 'Le nom du job ne doit pas dépasser 150 caractères',
  'string.empty': 'Le nom du job est requis',
  'any.required': 'Le nom du job est requis'
});
const urls = Joi.string().required().messages({
  'string.empty': 'Vous devez entrer au moins une url',
  'any.required': 'Le champs url est requis'
});

interface IError {
  field: string | number;
  error: string;
}

export default {
  schemas: {
    jobSchema: Joi.object().keys({
      name,
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

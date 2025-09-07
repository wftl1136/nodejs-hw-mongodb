import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  if (typeof req.body.isFavourite !== 'undefined') {
    req.body.isFavourite = Boolean(req.body.isFavourite);
  }
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad request', { errors: err.details });
    next(error);
  }
};
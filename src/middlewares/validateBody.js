import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  if (req.body && typeof req.body.isFavourite !== 'undefined') {
    req.body.isFavourite = Boolean(req.body.isFavourite);
  }
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const messages = err.details?.map((detail) => detail.message);
    next(createHttpError(400, 'Bad request', { errors: messages }));
  }
};
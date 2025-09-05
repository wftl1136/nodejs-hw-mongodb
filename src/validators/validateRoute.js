import createHttpError from "http-errors";
import mongoose from "mongoose";

export const validateRoute = (req, res, next, id) => {
if (!mongoose.Types.ObjectId.isValid(id)) {
return next(createHttpError(400, 'Invalid contact ID'));
}
next();
};
import createHttpError from 'http-errors';
import { User } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { Session } from '../db/models/Session.js';
import { FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/index.js';
import { randomBytes } from 'crypto';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user)
    throw createHttpError(409, 'Conflict error', {
      details: 'Email is already in use',
    });

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({ ...payload, password: encryptedPassword });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  };
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) throw createHttpError(401, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await Session.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await Session.create({
    ...newSession,
    userId: user._id,
  });
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) throw createHttpError(401, 'Session expired');

  const newSession = createSession();

  await Session.deleteOne({ _id: sessionId, refreshToken });

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};
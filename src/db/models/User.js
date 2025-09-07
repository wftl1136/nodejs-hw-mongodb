import { model, Schema } from 'mongoose';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.set('toJSON', {
  transform(doc, obj) {
    delete obj.password;
    return obj;
  },
});

export const User = model('user', userSchema);
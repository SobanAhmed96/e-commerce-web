import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      minlength: [3, 'Minimum 3 characters are required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    profileImage:{
        type: String,
      required: [true, 'Profile Image is required'],
    }
  },
  { timestamps: true }
);

authSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

authSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
      this.setUpdate(update);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

authSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

authSchema.methods.generateToken = async function () {
  return jwt.sign(
    { id: this._id, name: this.username, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const Auth = mongoose.model("Auth",authSchema);
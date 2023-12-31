import mongoose from "mongoose";
import { IUser, UserModel } from "./user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    wishlist: [
      { bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" } },
    ],
    readingList: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },
        readingState: Boolean,
        finishState: Boolean,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

userSchema.statics.isUserExists = async function (
  email: string
): Promise<Pick<IUser, "email" | "role" | "password" | "_id"> | null> {
  return await User.findOne(
    { email: email },
    { _id: 1, password: 1, email: 1, role: 1 }
  );
};
userSchema.statics.isUserExistsWithId = async function (
  userId: string
): Promise<Pick<IUser, "email" | "role" | "password" | "_id"> | null> {
  return await User.findOne(
    { _id: userId },
    { _id: 1, password: 1, email: 1, role: 1 }
  );
};
userSchema.statics.isPasswordMatched = async function (
  incomingPass: string,
  databasePass: string
): Promise<boolean> {
  return await bcrypt.compare(incomingPass, databasePass);
};

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = mongoose.model<IUser, UserModel>("User", userSchema);

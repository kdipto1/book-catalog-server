import { Model, Types } from "mongoose";

export type IUser = {
  _id?: Types.ObjectId;
  email: string;
  role: "user";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
};

// export type UserModel = Model<IUser, Record<string, unknown>>;

export type UserModel = {
  isUserExists(
    phoneNumber: string
  ): Promise<Pick<IUser, "email" | "role" | "password" | "_id"> | null>;
  isUserExistsWithId(
    phoneNumber: string
  ): Promise<Pick<IUser, "email" | "role" | "password" | "_id"> | null>;
  isPasswordMatched(
    incomingPass: string,
    databasePass: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserLoginResponse = {
  accessToken: string;
  refreshToken: string;
  userId: Types.ObjectId | undefined;
};

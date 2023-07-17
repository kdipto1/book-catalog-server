import { Model, Schema } from "mongoose";

export type IReviews = {
  reviewer: Schema.Types.ObjectId;
  rating: number;
  comment: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  addedBy: Schema.Types.ObjectId;
  reviews: IReviews[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
  publicationYear?: string;
};

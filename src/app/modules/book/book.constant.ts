export const bookSearchableFields = ["title", "author", "genre"];

export const bookFilterableFields = [
  "searchTerm",
  "title",
  "author",
  "genre",
  "publicationDate",
  "publicationYear",
];

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
};

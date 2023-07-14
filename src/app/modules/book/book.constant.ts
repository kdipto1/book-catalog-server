export const bookSearchableFields = ["title", "author", "genre"];

export const bookFilterableFields = [
  "searchTerm",
  "title",
  "author",
  "genre",
  "publicationDate",
];

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
};

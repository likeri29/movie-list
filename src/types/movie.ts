export interface Movie {
  id: string;
  title: string;
  image: string;
  publishingYear: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoviesResponse {
  movies: Movie[];
  totalPages: number;
  totalMovies: number;
  currentPage: number;
}

export interface MovieFormValues {
  title: string;
  year: string;
  image: File | string | null;
}

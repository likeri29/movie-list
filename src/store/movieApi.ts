import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, MoviesResponse, MovieFormValues } from "@/types/movie";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponse, void>({
      query: () => "movieList",
    }),

    getMovieById: builder.query<Movie, string>({
      query: (id: string) => `movieList/${id}`,
    }),

    createMovie: builder.mutation<Movie, MovieFormValues>({
      query: (newMovie) => ({
        url: "movieList",
        method: "POST",
        body: newMovie,
      }),
    }),

    updateMovie: builder.mutation<
      Movie,
      { id: string; updatedMovie: MovieFormValues }
    >({
      query: ({ id, updatedMovie }) => ({
        url: `movieList/${id}`,
        method: "PATCH",
        body: updatedMovie,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
} = movieApi;

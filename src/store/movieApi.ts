import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, MoviesResponse, MovieFormValues } from "@/types/movie";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponse, void>({
      query: () => "movieList",
      providesTags: [{ type: "Movies", id: "LIST" }],
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            movieApi.util.invalidateTags([{ type: "Movies", id: "LIST" }])
          );
        } catch (err) {
          console.error("Error while creating movie", err);
        }
      },
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

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            movieApi.util.invalidateTags([{ type: "Movies", id: "LIST" }])
          );
        } catch (err) {
          console.error("Error while updating movie", err);
        }
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
} = movieApi;

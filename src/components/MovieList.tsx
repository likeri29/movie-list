"use client";

import { useGetMoviesQuery } from "@/store/movieApi";
import { Box, Typography, CircularProgress } from "@mui/material";

export function MovieList() {
  const { data, isLoading } = useGetMoviesQuery(undefined);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h5" className="text-white mb-4">
        Movie List
      </Typography>
      {data && data.movies.length > 0 ? (
        data.movies.map((movie) => (
          <Box key={movie.id} className="mb-4">
            <Typography variant="h6" className="text-white">
              {movie.title}
            </Typography>
            <Typography variant="body2" className="text-white">
              {movie.publishingYear}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1" className="text-white">
          No movies found.
        </Typography>
      )}
    </Box>
  );
}

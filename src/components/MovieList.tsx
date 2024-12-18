"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useGetMoviesQuery } from "@/store/movieApi";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid2,
  Grid,
  IconButton,
} from "@mui/material";
import { Logout, AddCircleOutline } from "@mui/icons-material";
import { Pagination } from "./Pagination";
import { MovieCard } from "./MovieCard";

export function MovieList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetMoviesQuery({ page });

  const handleLogout = () => {
    signOut({
      callbackUrl: "/signin",
    });
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    refetch();
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data?.movies.length) {
    return (
      <Box className="flex flex-col justify-center items-center w-full h-screen">
        <Typography
          sx={{
            color: "white",
            marginBottom: "16px",
            fontSize: { xs: "32px", sm: "48px" },
            lineHeight: { xs: "48px", sm: "56px" },
            fontWeight: "600",
            textAlign: "center",
            mb: 6,
          }}
        >
          Your movie list is empty
        </Typography>

        <Button variant="contained" component={Link} href="/movie">
          Add a new movie
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: { xs: "50px 24px", md: "120px" },
        gap: { xs: "50px", md: "80px" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: { xs: "24px", sm: "28px" },
            marginRight: "8px",
          }}
        >
          My Movies
        </Typography>

        <Link href="/movie" passHref>
          <IconButton sx={{ color: "white" }}>
            <AddCircleOutline />
          </IconButton>
        </Link>

        <IconButton
          sx={{ color: "white", marginLeft: "auto" }}
          onClick={handleLogout}
        >
          <Logout />
        </IconButton>
      </Box>
      <Grid2 container justifyContent="center" spacing={{ xs: 2, sm: 4 }}>
        {data?.movies.map((movie) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={movie.id} component="div">
            <MovieCard
              image={movie.image}
              title={movie.title}
              year={movie.publishingYear.toString()}
              movieId={movie.id}
            />
          </Grid>
        ))}
      </Grid2>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: { xs: 12, md: 0 },
        }}
      >
        <Pagination
          totalPages={data?.totalPages || 1}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

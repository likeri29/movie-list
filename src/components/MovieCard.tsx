import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  image: string;
  title: string;
  year: string;
  movieId: string;
}

export function MovieCard({ image, title, year, movieId }: MovieCardProps) {
  return (
    <Link href={`/movie/${movieId}`} passHref>
      <Card
        sx={{
          backgroundColor: "#092C39",
          width: { xs: "150px", sm: "18rem" },
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: { xs: "0", sm: "8px" },
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.05)",
            transition: "all 0.3s ease",
            backgroundColor: "rgba(8, 41, 53, 0.55)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "246px", sm: "400px" },
          }}
        >
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </Box>
        <CardContent sx={{ padding: "16px" }}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              marginBottom: "8px",
              fontWeight: 500,
              fontSize: "20px",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              fontSize: "14px",
            }}
          >
            {year}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

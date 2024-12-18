"use client";

import { useEffect, useState } from "react";

export function MovieList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movieList", { method: "GET" });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch movies");
        }

        const data = await response.json();
        console.log("Fetched Movies:", data.movies); // Log the movies to the console
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="text-white">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <div className="text-white">Movies fetched. Check console logs.</div>;
}

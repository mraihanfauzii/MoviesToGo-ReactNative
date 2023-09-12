const config = require("../../../../package.json");
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
export const YOUTUBE_BASE_URL = "https://www.youtube.com/watch";

export const TMDB_API_KEY = config.projectConfig.apiKey;

export const ENDPOINTS = {
  NOW_PLAYING_MOVIES: "/movie/now_playing",
  UPCOMING_MOVIES: "/movie/upcoming",
  GENRES: "/genre/movie/list",
  MOVIEDETAIL: "/movie",
};

export const APPEND_TO_RESPONSE = {
  VIDEOS: "videos",
  CREDITS: "credits",
  RECOMMENDATIONS: "recommendations",
  SIMILAR: "similar",
};

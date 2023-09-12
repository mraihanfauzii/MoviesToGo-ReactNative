const axios = require("axios").default;
import {
  TMDB_BASE_URL,
  TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL,
  ENDPOINTS,
  YOUTUBE_BASE_URL,
} from "../../features/movie/constants/url-tmdb";
import { Languages } from "../../features/movie/constants/languages";

const TMDB_HTTP_REQUEST = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getNowPlayingMovies = () =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES);

export const getUpcomingMovies = () =>
  TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES);

export const getMovieById = (movieId, append_to_response = "") =>
  TMDB_HTTP_REQUEST.get(
    `${ENDPOINTS.MOVIEDETAIL}/${movieId}`,
    append_to_response ? { params: { append_to_response } } : null,
  );

export const getAllGenres = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);

export const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

export const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

export const getLanguage = (language_iso) =>
  Languages.find((language) => language.iso_639_1 === language_iso);

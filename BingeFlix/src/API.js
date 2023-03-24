const { default: axios } = require("axios");

export const popularConfig = {
  method: "get",
  baseURL: "https://api.themoviedb.org/3",
  url: "/movie/popular",
  params: {
    api_key: "c2ca319dea6dfae2a8361886869a5592",
  },
};

export function nowPlayingConfig(page) {
  return {
    method: "get",
    baseURL: "https://api.themoviedb.org/3",
    url: "/movie/now_playing",
    params: {
      api_key: "c2ca319dea6dfae2a8361886869a5592",
      page: page,
    },
  };
}

export function searchMovieConfig(queryTerm) {
  return {
    method: "get",
    baseURL: "https://api.themoviedb.org/3",
    url: "/search/movie",
    params: {
      api_key: "c2ca319dea6dfae2a8361886869a5592",
      query: queryTerm,
    },
  };
}

export function getMovieDetailsConfig(movieId) {
  return {
    method: "get",
    baseURL: "https://api.themoviedb.org/3",
    url: `/movie/${movieId}`,
    params: {
      api_key: "c2ca319dea6dfae2a8361886869a5592",
    },
  };
}
export function getCastDetailsConfig(movieId) {
  return {
    method: "get",
    baseURL: "https://api.themoviedb.org/3",
    url: `/movie/${movieId}/credits`,
    params: {
      api_key: "c2ca319dea6dfae2a8361886869a5592",
    },
  };
}

export function getSimilarMoviesConfig(movieId) {
  return {
    method: "get",
    baseURL: "https://api.themoviedb.org/3",
    url: `/movie/${movieId}/similar`,
    params: {
      api_key: "c2ca319dea6dfae2a8361886869a5592",
    },
  };
}




export function genreFilterConfig(genreIds, page) {
  return {
    method: "get",
    baseURL: "https://api.themoviedb.org/3",
    url: "/movie/now_playing",
    params: {
      api_key: "c2ca319dea6dfae2a8361886869a5592",
      with_genres: genreIds,
      page: page,
    },
  };
}

export let getTrailerConfig = (id) =>  {
  let config = {
      method: "get",
      baseURL : "https://api.themoviedb.org/3",
      url : `/movie/${id}/videos`,
      params: {
          api_key: "c2ca319dea6dfae2a8361886869a5592",
      },
  }
  return config;
}

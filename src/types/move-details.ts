// @flow
export type IMovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongs_to_collection;
  budget: number;
  genres: IGenresItem[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompaniesItem[];
  production_countries: IProductionCountriesItem[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguagesItem[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export type IBelongs_to_collection = {
  id: number;
  name: string;
  poster_path: null;
  backdrop_path: null;
};
export type IGenresItem = {
  id: number;
  name: string;
};
export type IProductionCompaniesItem = {
  id: number;
  logo_path: null;
  name: string;
  origin_country: string;
};
export type IProductionCountriesItem = {
  iso_3166_1: string;
  name: string;
};
export type ISpokenLanguagesItem = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

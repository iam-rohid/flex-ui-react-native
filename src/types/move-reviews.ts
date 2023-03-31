// @flow
export type IReviews = {
  id: number;
  page: number;
  results: IReview[];
  total_pages: number;
  total_results: number;
};
export type IReview = {
  author: string;
  author_details: IReviewAuthor;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};
export type IReviewAuthor = {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: null | number;
};

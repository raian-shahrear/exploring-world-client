type TFollowing = {
  user: string;
};
export type TLoggedInUser = {
  id: string;
  userEmail: string;
  userName: string;
  role: "user" | "admin";
  userProfile: string;
  userPhone: string;
  userAddress: string;
  following: TFollowing[] | [];
  follower: TFollowing[] | [];
  isVerified: string;
  iat: number;
  exp: number;
};

export type TPostCategory = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TPost = {
  title: string;
  image: string[];
  category: string;
  travelStory: string;
  premium: {
    travelGuide: string;
    destinationTips: string;
  };
};

export type TUser = {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  profile: string;
  phone: string;
  address: string;
  following: TFollowing[] | [];
  follower: TFollowing[] | [];
  isVerified: string;
  needPassChange?: boolean;
  passwordChangedAt?: Date;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TDisplayPost = {
  _id: string;
  title: string;
  image: string[];
  category: TPostCategory;
  author: TUser;
  travelStory: string;
  premium: {
    travelGuide: string;
    destinationTips: string;
  };
  upvote?: string[] | [];
  downvote?: string[] | [];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TComment = {
  post: string;
  comment: string;
};
export type TDisplayComment = {
  _id: string;
  post: TDisplayPost;
  user: TUser;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TFilterProps = {
  searchTerm?: string;
  sort?: string;
  limit?: number;
  page?: number;
  categories?: string | string[];
  authors?: string | string[];
};

export type TInitialStateForPost = {
  search: string;
  category: string[];
  author: string[];
  sortBy: string;
};
export type TActionForPost =
  | { type: "search"; payload: string }
  | { type: "sortBy"; payload: string }
  | { type: "category"; payload: string[] }
  | { type: "author"; payload: string[] };

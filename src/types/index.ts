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
  isVerified: boolean;
  iat: number;
  exp: number;
};

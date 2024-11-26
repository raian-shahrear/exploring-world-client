import FollowingPostsSection from "../_components/FollowingPostsSection";

export const metadata = {
  title: "Exploring World - Following User's Posts",
  description: "Welcome to post page to display your following user's posts.",
  keywords: "following's posts, following user's posts, posts, user's posts",
};

export type TFollowingPostProps = {
  params: { slug: string[] };
};

const FollowingPosts = ({ params }: TFollowingPostProps) => {
  return (
    <div>
      <FollowingPostsSection params={params} />
    </div>
  );
};

export default FollowingPosts;

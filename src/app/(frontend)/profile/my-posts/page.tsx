import MyPostsSection from "./_components/MyPostsSection";

export const metadata = {
  title: "Exploring World - My Posts",
  description: "Welcome to post page to display your own posts.",
  keywords: "my posts, posts, my profile",
};

const MyPosts = () => {
  return (
    <div>
      <MyPostsSection />
    </div>
  );
};

export default MyPosts;

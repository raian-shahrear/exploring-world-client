import NewsFeedSection from "./_components/NewsFeedSection";

export const metadata = {
  title: "Exploring World - News feed",
  description: "Welcome to news feed page where anyone can view all posts by filtering",
  keywords: "news feed, posts, filter-post, filter, all posts",
};

const NewsFeed = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">News Feed</h1>
      <NewsFeedSection />
    </div>
  );
};

export default NewsFeed;

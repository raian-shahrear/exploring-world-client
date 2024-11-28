import PostDetailsSection from "./_components/PostDetailsSection";

export const metadata = {
  title: "Exploring World - Post Details",
  description: "Welcome to post details page.",
  keywords: "post details, post download, post gallery, post comment, premium",
};

export type TPostDetailsProps = {
  params: {
    postId: string;
  };
};

const PostSinglePage = ({ params }: TPostDetailsProps) => {
  return (
    <div className="xl:w-8/12 mx-auto">
      <PostDetailsSection params={params} />
    </div>
  );
};

export default PostSinglePage;

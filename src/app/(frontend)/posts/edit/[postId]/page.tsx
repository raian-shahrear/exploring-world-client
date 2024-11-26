import EditPostForm from "../_components/EditPostForm";

export const metadata = {
  title: "Exploring World - Edit Post",
  description: "Welcome to edit post page, where post owner can edit a specific post",
  keywords: "edit post, edit details",
};

export type TEditPostProps = {
  params: any
}

const EditPostById = ({ params }: TEditPostProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-10">Edit A Post</h1>
      <div>
        <EditPostForm params={params} />
      </div>
    </div>
  );
};

export default EditPostById;

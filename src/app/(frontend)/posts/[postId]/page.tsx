/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const PostDetails = ({ params }: { params: any }) => {
  return (
    <div>
      <p className="text-xl font-bold">Post details for {params?.postId}</p>
    </div>
  );
};

export default PostDetails;

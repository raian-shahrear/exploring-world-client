import React from "react";

const FollowerPosts = ({ params }: { params: { slug: string[] } }) => {
  return (
    <div>
      <p>Post for user {params.slug[0]}</p>
      <p>Post for user {params.slug[0]}</p>
      <p>Post for user {params.slug[0]}</p>
      <p>Post for user {params.slug[0]}</p>
    </div>
  );
};

export default FollowerPosts;

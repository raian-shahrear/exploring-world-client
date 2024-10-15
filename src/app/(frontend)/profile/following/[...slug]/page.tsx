import React from "react";

const FollowingPosts = ({ params }: { params: { slug: string[] } }) => {
  return (
    <div>
      <p>Post for user {params.slug[0]}</p>
      <p>Post for user {params.slug[0]}</p>
      <p>Post for user {params.slug[0]}</p>
      <p>Post for user {params.slug[0]}</p>
    </div>
  );
};

export default FollowingPosts;

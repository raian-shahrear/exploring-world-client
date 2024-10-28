"use client";
/* eslint-disable @next/next/no-img-element */
// lightgallery
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { TDisplayPost } from "@/types";
import React from "react";
import Link from "next/link";

type TProps = {
  post: TDisplayPost;
};

const PostCardGallery = ({ post }: TProps) => {
  return (
    <div className="mt-6">
      <LightGallery
        elementClassNames={`grid ${
          post?.image?.length === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
        {post?.image?.map((img, idx) => (
          <Link
            key={idx}
            href={img}
            className={`w-full ${
              post?.image?.length === 3 && idx === 0
                ? "col-span-2"
                : "col-span-1"
            }`}
          >
            <img
              src={img}
              alt="post image"
              className="border-4 border-white w-full h-[400px] object-cover object-center rounded-md"
            />
          </Link>
        ))}
      </LightGallery>
    </div>
  );
};

export default PostCardGallery;

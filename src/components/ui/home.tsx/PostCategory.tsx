"use client";
import React, { useState } from "react";

const PostCategory = () => {
  const [controlCategoryTab, setControlCategoryTab] = useState(0);
  return (
    <div className="">
      <p className="text-sm font-bold">Post Category</p>
      <div className="flex flex-wrap gap-1 mt-1">
        <button
          onClick={() => setControlCategoryTab(0)}
          className={`text-xs text-white py-1 px-2 rounded-3xl ${
            controlCategoryTab === 0 ? "bg-gray-900" : "bg-gray-400"
          }`}
        >
          All
        </button>
        {Array.from({ length: 30 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setControlCategoryTab(index + 1)}
            className={`text-xs text-white py-1 px-2 rounded-3xl ${
              controlCategoryTab === index + 1 ? "bg-gray-900" : "bg-gray-400"
            }`}
          >
            Travel {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostCategory;

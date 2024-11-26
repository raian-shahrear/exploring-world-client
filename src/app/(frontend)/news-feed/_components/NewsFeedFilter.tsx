"use client";
import { TActionForPost, TPostCategory } from "@/types";
import { Dispatch } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";

type TProps = {
  dispatch: Dispatch<TActionForPost>;
  userNameLoading: boolean;
  authorOption: any;
  categoryLoading: boolean;
  categories: any;
  resetBtnEnable: boolean;
  handleResetFilter: () => void;
};

const NewsFeedFilter = ({
  dispatch,
  userNameLoading,
  authorOption,
  categoryLoading,
  categories,
  resetBtnEnable,
  handleResetFilter,
}: TProps) => {
  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_200px_200px_200px_80px] gap-4">
      <div>
        <input
          type="text"
          name="search"
          className="w-full h-[36px] border rounded-md py-2 px-4 text-sm"
          placeholder="Search by title or travel story..."
          onChange={(e) =>
            dispatch({ type: "search", payload: e.target.value })
          }
        />
      </div>
      <div>
        <select
          name="sortBy"
          className="w-full border rounded-md py-2 px-4 text-sm"
          onChange={(e) =>
            dispatch({ type: "sortBy", payload: e.target.value })
          }
        >
          <option>Sort by upvote</option>
          <option value="-upvoteCount">Most Upvote</option>
          <option value="upvoteCount">Lest Upvote</option>
        </select>
      </div>
      <div>
        <select
          name="author"
          className="w-full border rounded-md py-2 px-4 text-sm disabled:bg-gray-200"
          onChange={(e) =>
            dispatch({ type: "author", payload: [e.target.value] })
          }
          disabled={userNameLoading}
        >
          <option>Select author</option>
          {authorOption?.map((author: { value: string; label: string }) => (
            <option key={author?.value} value={author?.value}>
              {author?.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          name="category"
          className="w-full border rounded-md py-2 px-4 text-sm disabled:bg-gray-200"
          onChange={(e) =>
            dispatch({ type: "category", payload: [e.target.value] })
          }
          disabled={categoryLoading}
        >
          <option>Select category</option>
          {categories?.data?.map((category: TPostCategory) => (
            <option key={category?._id} value={category?._id}>
              {category?.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          type="reset"
          onClick={() => handleResetFilter()}
          className="w-fit lg:w-full h-[36px] px-2 bg-gray-900 text-white text-sm rounded-md flex items-center justify-center justify-self-end sm:justify-self-start gap-1 transition-all duration-300 hover:bg-gray-700 disabled:bg-gray-400"
          disabled={resetBtnEnable}
        >
          <span>
            <FaArrowRotateLeft />
          </span>
          <span>Reset</span>
        </button>
      </div>
    </form>
  );
};

export default NewsFeedFilter;

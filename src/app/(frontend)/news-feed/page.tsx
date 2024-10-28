"use client";
import PostSmallCard from "@/components/ui/postSmallCard/PostSmallCard";
import { useUser } from "@/context/user.provider";
import { useGetAllUserName } from "@/hooks/auth.hook";
import { useGetCategories } from "@/hooks/category.hook";
import { useDeletePost, useGetAllPosts } from "@/hooks/post.hook";
import useDebounce from "@/hooks/useDebounce";
import {
  TActionForPost,
  TDisplayPost,
  TInitialStateForPost,
  TPostCategory,
  TUser,
} from "@/types";
import { useEffect, useReducer, useState } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";

const initialState: TInitialStateForPost = {
  search: "",
  sortBy: "",
  category: [],
  author: [],
};
const reducer = (
  currentState: TInitialStateForPost,
  action: TActionForPost
) => {
  switch (action.type) {
    case "search":
      return { ...currentState, search: action.payload };
    case "sortBy":
      return { ...currentState, sortBy: action.payload };
    case "category":
      return { ...currentState, category: action.payload };
    case "author":
      return { ...currentState, author: action.payload };
    default:
      return currentState;
  }
};

const NewsFeed = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: categories, isLoading: categoryLoading } = useGetCategories();
  const { mutate: handleDeletePost } = useDeletePost();
  const { user: findUser } = useUser();
  const { data: allUsersName, isLoading: userNameLoading } =
    useGetAllUserName();

  const [page, setPage] = useState<number>(1);
  const [resetBtnEnable, setResetBtnEnable] = useState(true);
  const [allPosts, setAllPosts] = useState<TDisplayPost[]>([]);
  const searchItem = useDebounce(state?.search, 300);
  const { data: posts, isLoading: postLoading } = useGetAllPosts({
    searchTerm: searchItem,
    sort: state?.sortBy,
    limit: 8,
    page,
    categories: state?.category?.length > 0 ? state?.category : "",
    authors: state?.author?.length > 0 ? state?.author : "",
  });

  const authorOption = allUsersName?.data
    ?.filter((user: TUser) => user?.role === "user")
    .map((user: TUser) => ({
      value: user._id,
      label: user.name,
    }));

  // delete post
  const handlePostDelete = (postId: string) => {
    const isConfirm = confirm("Are you sure to delete?");
    if (isConfirm) {
      handleDeletePost(postId);
    }
  };

  // reset filter
  const handleResetFilter = () => {
    dispatch({ type: "search", payload: "" });
    dispatch({ type: "sortBy", payload: "" });
    dispatch({ type: "category", payload: [] });
    dispatch({ type: "author", payload: [] });
  };
  useEffect(() => {
    if (
      state.search ||
      state.sortBy ||
      state.category.length ||
      state.author.length
    ) {
      setResetBtnEnable(false);
    } else if (
      !state.search &&
      !state.sortBy &&
      !state.category.length &&
      !state.author.length
    ) {
      setResetBtnEnable(true);
    }
    setAllPosts([]);
    setPage(1);
  }, [state.search, state.sortBy, state.category, state.author]);

  // infinity scrolling
  useEffect(() => {
    if (posts?.data && Array.isArray(posts.data)) {
      setAllPosts((prev) => {
        const existingPostIds = new Set(
          prev.map((post: TDisplayPost) => post._id)
        );
        const newUniquePosts = posts.data.filter(
          (post: TDisplayPost) => !existingPostIds.has(post._id)
        );
        return page === 1 ? newUniquePosts : [...prev, ...newUniquePosts];
      });
    }
  }, [posts, page]);
  const handleInfiniteScroll = async () => {
    try {
      const reachedBottom =
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight;
      if (
        reachedBottom &&
        posts?.meta?.totalPage &&
        page < posts.meta.totalPage
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [page, posts]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">News Feed</h1>
      <div className="mt-6">
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
              <option value="-upvote">Most Upvote</option>
              <option value="upvote">Lest Upvote</option>
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
      </div>
      <div
        className={`mt-10 grid grid-cols-1 gap-6 ${
          allPosts?.length === 1
            ? "md:grid-cols-1 lg:grid-cols-1"
            : allPosts?.length === 2
            ? "md:grid-cols-2 lg:grid-cols-2"
            : allPosts?.length === 3
            ? "md:grid-cols-2 lg:grid-cols-3"
            : "md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {allPosts?.map((post: TDisplayPost) => (
          <PostSmallCard
            key={post?._id}
            posts={allPosts}
            post={post}
            findUser={findUser}
            handlePostDelete={handlePostDelete}
          />
        ))}
      </div>
      {postLoading && (
        <div className="mt-10 flex justify-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;

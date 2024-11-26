"use client";
import RingLoader from "@/components/ui/loading/RingLoader";
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
  TUser,
} from "@/types";
import { useEffect, useReducer, useState } from "react";
import NewsFeedFilter from "./NewsFeedFilter";

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

const NewsFeedSection = () => {
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
    <>
      <div className="mt-6">
        <NewsFeedFilter
          dispatch={dispatch}
          userNameLoading={userNameLoading}
          authorOption={authorOption}
          categoryLoading={categoryLoading}
          categories={categories}
          resetBtnEnable={resetBtnEnable}
          handleResetFilter={handleResetFilter}
        />
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
      {!postLoading && allPosts?.length === 0 && (
        <div className="mt-10">
          <p className="text-center text-gray-300 text-2xl font-semibold">
            No Post Found
          </p>
        </div>
      )}
      {postLoading && (
        <div className="mt-10 flex justify-center">
          <RingLoader />
        </div>
      )}
    </>
  );
};

export default NewsFeedSection;

/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import { useUser } from "@/context/user.provider";
import { IoSend, IoTimeOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BiDislike, BiLike } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import PostEditCommentModal from "./PostEditCommentModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// lightgallery
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const postData = [
  {
    id: "01",
    title: "My First Business Travel at London",
    image: ["https://i.ibb.co.com/yqWCYJh/Ellipticals.jpg"],
    category: "Travel 23",
    travelStory:
      "Travel story about Business Travel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
    premium: {
      travelGuide:
        "travel guide about Business Travel. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
      destinationTips:
        "Destination tips about Business Travel. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
    },
  },
  {
    id: "02",
    title: "My First Business Travel at London.",
    image: [
      "https://i.ibb.co.com/yqWCYJh/Ellipticals.jpg",
      "https://i.ibb.co.com/yqWCYJh/Ellipticals.jpg",
    ],
    category: "Travel 20",
    travelStory:
      "Travel story about Business Travel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
    premium: {
      travelGuide:
        "travel guide about Business Travel. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
      destinationTips:
        "Destination tips about Business Travel. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
    },
  },
  {
    id: "03",
    title: "My First Business Travel at London",
    image: [
      "https://i.ibb.co.com/yqWCYJh/Ellipticals.jpg",
      "https://i.ibb.co.com/yqWCYJh/Ellipticals.jpg",
      "https://i.ibb.co.com/yqWCYJh/Ellipticals.jpg",
      "https://i.ibb.co.com/yqWCYJh/Ellipticals.jpg",
    ],
    category: "Travel 14",
    travelStory:
      "Travel story about Business Travel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
    premium: {
      travelGuide:
        "travel guide about Business Travel. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
      destinationTips:
        "Destination tips about Business Travel. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
    },
  },
  {
    id: "04",
    title: "My First Business Travel at London",
    image: [
      "https://i.ibb.co.com/yqWCYJh/Ellipticals.jpg",
      "https://i.ibb.co.com/yqWCYJh/Ellipticals.jpg",
      "https://i.ibb.co.com/yqWCYJh/Ellipticals.jpg",
    ],
    category: "Travel 18",
    travelStory:
      "Travel story about Business Travel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
    premium: {
      travelGuide:
        "travel guide about Business Travel. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
      destinationTips:
        "Destination tips about Business Travel. Atque itaque nihil repellat cumque vitae aliquam ipsum, enim veritatis adipisci totam maxime voluptatibus dolore ut facilis debitis in minima incidunt. A, perferendis ducimus! Maxime deleniti vero necessitatibus aut unde temporibus vitae dolorum mollitia, excepturi voluptates autem, ad dolor perspiciatis porro sit, beatae culpa eveniet assumenda velit. Minima earum, velit unde eum quod corrupti tempore ipsum enim neque? Dolores aut eaque alias. Perspiciatis cumque eius vero atque commodi! Minima aspernatur sunt incidunt quisquam reprehenderit amet odit officia rerum tempore eaque, hic saepe facilis perspiciatis velit cum, error accusamus earum animi iure suscipit.",
    },
  },
];

const PostCard = () => {
  const { user } = useUser();
  const [controlComment, setControlComment] = useState(false);
  const [controlDetails, setControlDetails] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleCommentSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data.comment);
  };
  return (
    <>
      {postData?.map((post) => (
        <div key={post?.id} className="border rounded-lg p-6">
          <div className="flex justify-between">
            <div className="grid grid-cols-[36px_auto] items-center gap-2">
              <Image
                src={userAvatar}
                alt="user"
                width={36}
                height={36}
                className="rounded-full border w-9 h-9"
              />
              <div>
                <p className="text-sm font-semibold flex gap-2">
                  <span>User Name</span>
                  <span>.</span>
                  <button className="text-blue-500">Follow</button>
                </p>
                <p className="text-xs font-medium flex items-center gap-1">
                  <IoTimeOutline /> dd/mm/yyyy
                </p>
              </div>
            </div>
            <div>
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  role="button"
                  className="text-lg p-0 h-8 w-8 rounded-[50%] flex justify-center items-center transition-all duration-300 hover:bg-gray-100"
                >
                  <HiDotsHorizontal />
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <button>Delete</button>
                  </li>
                  <li>
                    <Link href="/posts/edit/1">Edit</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 gap-6">
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

          <div className="mt-6">
            <p className="text-base font-semibold">{post?.title}</p>
            <p className="text-sm font-medium">{post?.category}</p>
            <div className="mt-3">
              <p className="text-sm flex flex-col gap-[2px]">
                <span className="font-bold">Story : </span>
                <span>{post?.travelStory}</span>
              </p>
              <button
                onClick={() => setControlDetails(true)}
                className={`text-sm text-blue-500 font-semibold underline transition-all duration-300 hover:no-underline ${
                  controlDetails ? "hidden" : "flex"
                } items-center gap-1`}
              >
                <IoMdArrowDropdown /> See More
              </button>
            </div>
            <div className={`${controlDetails ? "block" : "hidden"}`}>
              <div className="mt-3">
                <p className="text-sm flex flex-col gap-[2px]">
                  <span className="font-bold">Travel Guide : </span>
                  <span>{post?.premium?.travelGuide}</span>
                </p>
              </div>
              <div className="mt-3">
                <p className="text-sm flex flex-col gap-[2px]">
                  <span className="font-bold">Destination Tips : </span>
                  <span>{post?.premium?.destinationTips}</span>
                </p>
              </div>
              <button
                onClick={() => setControlDetails(false)}
                className="mt-3 text-sm text-blue-500 font-semibold underline transition-all duration-300 hover:no-underline flex items-center gap-1"
              >
                <IoMdArrowDropup /> See Less
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t flex justify-between items-center">
            <div>
              <button className="btn btn-xs me-2">
                <span className="text-sm">
                  <BiLike />
                </span>{" "}
                Upvote
              </button>
              <button className="btn btn-xs">
                <span className="text-sm">
                  <BiDislike />
                </span>{" "}
                Downvote
              </button>
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setControlComment(!controlComment)}
            >
              <span>
                {controlComment ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </span>
              <span className="text-xs font-semibold">Comments (6)</span>
            </div>
          </div>

          <div className="mt-4">
            <div
              className={`${
                controlComment ? "flex" : "hidden"
              } flex-col gap-2 max-h-96 overflow-y-auto`}
            >
              <div className="grid grid-cols-[36px_auto_34px] items-start gap-4 bg-gray-100 p-2 rounded-md">
                <div>
                  <Image
                    src={userAvatar}
                    alt="user"
                    width={36}
                    height={36}
                    className="rounded-full border w-9 h-9"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold flex items-center gap-2 mb-1">
                    <span>User Name</span>
                    <span>.</span>
                    <span className="font-normal">dd/mm/yyyy</span>
                  </p>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatum voluptatibus molestiae magnam! Voluptatibus
                    corporis error, alias quasi hic quae veniam facilis enim ea,
                    modi veritatis quaerat aut, vero iusto numquam dolore
                    itaque. Dignissimos reprehenderit possimus asperiores
                    cupiditate eligendi veritatis nobis nulla veniam aliquam
                    totam porro dolor laborum, soluta quas sint.
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <PostEditCommentModal id={"modal_0"} />
                  <button>
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[36px_auto_34px] items-start gap-4 bg-gray-100 p-2 rounded-md">
                <div>
                  <Image
                    src={userAvatar}
                    alt="user"
                    width={36}
                    height={36}
                    className="rounded-full border w-9 h-9"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold flex items-center gap-2 mb-1">
                    <span>User Name</span>
                    <span>.</span>
                    <span className="font-normal">dd/mm/yyyy</span>
                  </p>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatum voluptatibus molestiae magnam! Voluptatibus
                    corporis error, alias quasi hic quae veniam facilis enim ea,
                    modi veritatis quaerat aut, vero iusto numquam dolore
                    itaque. Dignissimos reprehenderit possimus asperiores
                    cupiditate eligendi veritatis nobis nulla veniam aliquam
                    totam porro dolor laborum, soluta quas sint.
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <PostEditCommentModal id={"modal_1"} />
                  <button>
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[36px_auto_34px] items-start gap-4 bg-gray-100 p-2 rounded-md">
                <div>
                  <Image
                    src={userAvatar}
                    alt="user"
                    width={36}
                    height={36}
                    className="rounded-full border w-9 h-9"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold flex items-center gap-2 mb-1">
                    <span>User Name</span>
                    <span>.</span>
                    <span className="font-normal">dd/mm/yyyy</span>
                  </p>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatum voluptatibus molestiae magnam! Voluptatibus
                    corporis error, alias quasi hic quae veniam facilis enim ea,
                    modi veritatis quaerat aut, vero iusto numquam dolore
                    itaque. Dignissimos reprehenderit possimus asperiores
                    cupiditate eligendi veritatis nobis nulla veniam aliquam
                    totam porro dolor laborum, soluta quas sint.
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <PostEditCommentModal id={"modal_2"} />
                  <button>
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[36px_auto_34px] items-start gap-4 bg-gray-100 p-2 rounded-md">
                <div>
                  <Image
                    src={userAvatar}
                    alt="user"
                    width={36}
                    height={36}
                    className="rounded-full border w-9 h-9"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold flex items-center gap-2 mb-1">
                    <span>User Name</span>
                    <span>.</span>
                    <span className="font-normal">dd/mm/yyyy</span>
                  </p>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatum voluptatibus molestiae magnam! Voluptatibus
                    corporis error, alias quasi hic quae veniam facilis enim ea,
                    modi veritatis quaerat aut, vero iusto numquam dolore
                    itaque. Dignissimos reprehenderit possimus asperiores
                    cupiditate eligendi veritatis nobis nulla veniam aliquam
                    totam porro dolor laborum, soluta quas sint.
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <PostEditCommentModal id={"modal_3"} />
                  <button>
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[36px_auto_34px] items-start gap-4 bg-gray-100 p-2 rounded-md">
                <div>
                  <Image
                    src={userAvatar}
                    alt="user"
                    width={36}
                    height={36}
                    className="rounded-full border w-9 h-9"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold flex items-center gap-2 mb-1">
                    <span>User Name</span>
                    <span>.</span>
                    <span className="font-normal">dd/mm/yyyy</span>
                  </p>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatum voluptatibus molestiae magnam! Voluptatibus
                    corporis error, alias quasi hic quae veniam facilis enim ea,
                    modi veritatis quaerat aut, vero iusto numquam dolore
                    itaque. Dignissimos reprehenderit possimus asperiores
                    cupiditate eligendi veritatis nobis nulla veniam aliquam
                    totam porro dolor laborum, soluta quas sint.
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <PostEditCommentModal id={"modal_4"} />
                  <button>
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[36px_auto_34px] items-start gap-4 bg-gray-100 p-2 rounded-md">
                <div>
                  <Image
                    src={userAvatar}
                    alt="user"
                    width={36}
                    height={36}
                    className="rounded-full border w-9 h-9"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold flex items-center gap-2 mb-1">
                    <span>User Name</span>
                    <span>.</span>
                    <span className="font-normal">dd/mm/yyyy</span>
                  </p>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatum voluptatibus molestiae magnam! Voluptatibus
                    corporis error, alias quasi hic quae veniam facilis enim ea,
                    modi veritatis quaerat aut, vero iusto numquam dolore
                    itaque. Dignissimos reprehenderit possimus asperiores
                    cupiditate eligendi veritatis nobis nulla veniam aliquam
                    totam porro dolor laborum, soluta quas sint.
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <PostEditCommentModal id={"modal_5"} />
                  <button>
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[36px_auto] items-start gap-2 mt-4">
              <div>
                <Image
                  src={user?.userProfile ? user?.userProfile : userAvatar}
                  alt="user"
                  width={36}
                  height={36}
                  className="rounded-full border w-9 h-9"
                />
              </div>
              <form onSubmit={handleSubmit(handleCommentSubmit)}>
                <textarea
                  {...register("comment")}
                  placeholder="Comment as User Name"
                  className="border px-3 py-2 w-full rounded-md text-xs min-h-10 bg-gray-100 focus-within:bg-white"
                />
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="reset"
                    className="text-xs font-semibold text-blue-500 transition-all duration-300 hover:underline"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="transition-all duration-300 hover:text-blue-500"
                  >
                    <IoSend />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostCard;

"use client";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getImageUrl } from "@/utils/getImageUrl";
import { useRouter } from "next/navigation";
import { useCreatePost } from "@/hooks/post.hook";
import { useGetCategories } from "@/hooks/category.hook";
import { TPost, TPostCategory } from "@/types";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const PostCreate = () => {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const editor = useRef(null);
  const [travelGuide, setTravelGuide] = useState("");
  const [destinationTips, setDestinationTips] = useState("");
  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetCategories();

  const config = useMemo(
    () => ({
      readonly: false,
      toolbarSticky: false,
      height: 300,
      toolbar: true,
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const handlePost: SubmitHandler<FieldValues> = async (data) => {
    if (isValid || !isSubmitting) {
      try {
        const imageUrl = await getImageUrl.getMultiImageUrl(selectedImages);
        const newPost: TPost = {
          title: data?.title,
          category: data?.category,
          image: imageUrl,
          travelStory: data?.travelStory,
          premium: {
            travelGuide,
            destinationTips,
          },
        };
        handleCreatePost(newPost);
        reset();
        setSelectedImages([]);
        setImagesPreview([]);
        setTravelGuide("");
        setDestinationTips("");
      } catch (err: any) {
        toast.error(
          err?.data?.message ? err?.data?.message : "Something went wrong!"
        );
      }
    }
  };

  //   image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const selectedFiles = Array.from(files);
    if (selectedFiles.length > 4) {
      return toast.error("You can only select up to 4 images");
    }
    // Update selectedImages
    setSelectedImages(selectedFiles);
    // Generate image preview URLs
    const previews: string[] = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          previews.push(reader.result.toString());
          if (previews.length === selectedFiles.length) {
            setImagesPreview(previews);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (!createPostPending && isSuccess) {
      router.push("/profile/my-posts");
    }
  }, [createPostPending, isSuccess, router]);

  if (createPostPending) {
    return (
      <div className="absolute top-2/4 left-2/4">
        <CommonLoader />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-10">
        Create A Post
      </h1>
      <div>
        <form onSubmit={handleSubmit(handlePost)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">
                Post Title<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Title..."
                className="border border-gray-300 py-1 px-2 rounded-lg w-full text-sm h-9"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">
                Category<span className="text-red-600">*</span>
              </label>
              <select
                className="border border-gray-300 py-1 px-2 rounded-lg w-full text-sm h-9"
                {...register("category", { required: true })}
                disabled={categoryLoading}
              >
                <option value="">Select category</option>
                {categoriesData?.data?.map((category: TPostCategory) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.title}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">
                Image (max. 4)<span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="border border-gray-300 py-1 px-2 rounded-lg w-full text-sm h-9"
                {...register("image", { required: "Image is required" })}
                onChange={(e) => {
                  handleImageChange(e);
                }}
              />
              {errors.image && (
                <span className="text-xs text-red-600 mt-[2px] inline-block">
                  {errors.image.message as string}
                </span>
              )}
            </div>
            {imagesPreview?.length > 0 && (
              <div className="flex flex-wrap gap-2 border border-gray-400 border-dashed p-4 rounded-lg">
                {imagesPreview.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt="post image"
                    width={100}
                    height={100}
                    className="object-cover rounded bg-gray-100"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-semibold">
              Travel Story<span className="text-red-600">*</span>
            </label>
            <textarea
              className="border border-gray-300 py-1 px-2 rounded-lg w-full text-sm"
              placeholder="Travel story..."
              {...register("travelStory", { required: true })}
            ></textarea>
            {errors.travelStory && (
              <span className="text-xs text-red-600 mt-[2px] inline-block">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-6 border border-gray-400 border-dashed p-4 rounded-lg">
            <label className="text-base font-semibold mb-2 inline-block">
              Premium Area (optional)
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold inline-block mb-1">
                  Travel Guide
                </label>
                <JoditEditor
                  ref={editor}
                  value={travelGuide}
                  config={config}
                  onChange={(newContent) => {
                    setTravelGuide(newContent);
                  }}
                />
              </div>
              <div>
                <label className="text-sm font-semibold inline-block mb-1">
                  Destination Tips
                </label>
                <JoditEditor
                  ref={editor}
                  value={destinationTips}
                  config={config}
                  onChange={(newContent) => {
                    setDestinationTips(newContent);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-gray-900 text-white py-2 px-3 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCreate;

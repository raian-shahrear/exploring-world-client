"use client";
import CommonLoader from "@/components/ui/loading/CommonLoader";
import { useGetCategories } from "@/hooks/category.hook";
import { useGetSinglePost, useUpdatePost } from "@/hooks/post.hook";
import { TPostCategory } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { TEditPostProps } from "../[postId]/page";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    ["link", "image", "video", "formula"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const EditPostForm = ({ params }: TEditPostProps) => {
  const router = useRouter();
  const { data: postSingleData, isLoading: getSinglePostLoading } =
    useGetSinglePost(params?.postId);
  const [postData, setPostData] = useState(postSingleData?.data);
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetCategories();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [travelGuide, setTravelGuide] = useState("");
  const [destinationTips, setDestinationTips] = useState("");
  const {
    mutate: handleUpdatePost,
    isPending: updatePostPending,
    isSuccess,
  } = useUpdatePost();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!getSinglePostLoading && postSingleData?.success) {
      const fetchedPost = postSingleData?.data;
      setPostData(fetchedPost);
      setValue("title", fetchedPost?.title);
      setValue("category", fetchedPost?.category?._id);
      setValue("travelStory", fetchedPost?.travelStory);
      setImagesPreview(fetchedPost?.image || []);
      setTravelGuide(fetchedPost?.premium?.travelGuide || "");
      setDestinationTips(fetchedPost?.premium?.destinationTips || "");
    }
  }, [getSinglePostLoading, postSingleData, router, setValue]);

  const handlePost: SubmitHandler<FieldValues> = async (data) => {
    if (isValid || !isSubmitting) {
      try {
        const imageUrl = imagesPreview?.filter(
          (img) => !img.startsWith("data:")
        );
        const formData = new FormData();

        if (selectedImages.length > 0) {
          for (const postImg of selectedImages) {
            formData.append("images", postImg);
          }
        }
        const newPost = {
          title: data?.title,
          category: data?.category,
          image: imageUrl,
          travelStory: data?.travelStory,
          premium: {
            travelGuide,
            destinationTips,
          },
        };
        formData.append("data", JSON.stringify(newPost));

        handleUpdatePost({ postId: postData?._id, postData: formData });
      } catch (err: any) {
        toast.error(
          err?.data?.message ? err?.data?.message : "Something went wrong!"
        );
      }
    }
  };

  //   Handle image change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    const totalImages = selectedFiles.length + imagesPreview.length;
    if (totalImages > 4) {
      return toast.error("You can only select up to 4 images in total");
    }

    const previews: string[] = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          previews.push(reader.result.toString());
          if (previews.length === selectedFiles.length) {
            setImagesPreview((prev) => [...prev, ...previews]);
            setSelectedImages((prev) => [...prev, ...selectedFiles]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove image (both existing and new)
  const handleRemoveImage = (index: number) => {
    if (index < postData?.data?.image.length) {
      setImagesPreview((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      const newFileIndex = index - postData?.data?.image.length;
      setImagesPreview((prev) => prev.filter((_, idx) => idx !== index));
      setSelectedImages((prev) =>
        prev.filter((_, idx) => idx !== newFileIndex)
      );
    }
  };

  useEffect(() => {
    if (!updatePostPending && isSuccess) {
      router.push(`/posts/edit/${postData?._id}`);
    }
  }, [updatePostPending, isSuccess, router, postData]);

  if (updatePostPending) {
    return (
      <div className="absolute top-2/4 left-2/4">
        <CommonLoader />
      </div>
    );
  }
  if (getSinglePostLoading) {
    return (
      <div className="absolute top-2/4 left-2/4">
        <CommonLoader />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handlePost)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Post Title</label>
          <input
            type="text"
            placeholder="Title..."
            className="border border-gray-300 py-1 px-2 rounded-lg w-full text-sm h-9"
            {...register("title")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Category</label>
          <select
            className="border border-gray-300 py-1 px-2 rounded-lg w-full text-sm h-9"
            {...register("category")}
            disabled={categoryLoading}
          >
            <option value="">Select category</option>
            {categoriesData?.data?.map((category: TPostCategory) => (
              <option
                key={category?._id}
                value={category?._id}
                disabled={category?.isDisabled}
              >
                {category?.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Image (max. 4)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="border border-gray-300 py-1 px-2 rounded-lg w-full text-sm h-9"
            {...register("image")}
            onChange={(e) => {
              handleImageChange(e);
            }}
          />
        </div>
        {imagesPreview?.length > 0 && (
          <div className="flex flex-wrap gap-2 border border-gray-400 border-dashed p-4 rounded-lg">
            {imagesPreview?.map((img, idx) => (
              <div key={idx} className="relative">
                <Image
                  key={idx}
                  src={img}
                  alt="post image"
                  width={96}
                  height={96}
                  className="object-cover rounded bg-gray-100 w-24 h-24"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 text-xs p-1 bg-red-500 text-white rounded"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-sm font-semibold">Travel Story</label>
        <textarea
          className="border border-gray-300 py-1 px-2 rounded-lg w-full text-sm min-h-24"
          placeholder="Travel story..."
          {...register("travelStory")}
        ></textarea>
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
            <ReactQuill
              theme="snow"
              value={travelGuide}
              onChange={setTravelGuide}
              modules={modules}
              placeholder="Write about travel guide..."
            />
          </div>
          <div>
            <label className="text-sm font-semibold inline-block mb-1">
              Destination Tips
            </label>
            <ReactQuill
              theme="snow"
              value={destinationTips}
              onChange={setDestinationTips}
              modules={modules}
              placeholder="Write about destination tips..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-gray-900 text-white py-2 px-3 rounded-md"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;

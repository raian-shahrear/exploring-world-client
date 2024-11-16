"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RingLoader from "@/components/ui/loading/RingLoader";
import { useUser } from "@/context/user.provider";
import { useGetCategories } from "@/hooks/category.hook";
import { useCreatePost } from "@/hooks/post.hook";
import { TPostCategory } from "@/types";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import userAvatar from "@/assets/icons/user-avatar-black.png";
import dynamic from "next/dynamic";

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

const CreatePostModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user: findUser } = useUser();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [travelGuide, setTravelGuide] = useState("");
  const [destinationTips, setDestinationTips] = useState("");
  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();
  const { data: categoriesData, isLoading: categoryLoading } =
    useGetCategories();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const handlePost: SubmitHandler<FieldValues> = async (data) => {
    if (isValid || !isSubmitting) {
      try {
        const formData = new FormData();

        const newPost = {
          title: data?.title,
          category: data?.category,
          travelStory: data?.travelStory,
          premium: {
            travelGuide,
            destinationTips,
          },
        };
        formData.append("data", JSON.stringify(newPost));
        for (const postImg of selectedImages) {
          formData.append("images", postImg);
        }

        handleCreatePost(formData);
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

  // image preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      setModalOpen(false);
    }
  }, [createPostPending, isSuccess]);
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="grid grid-cols-[40px_auto] items-center gap-4 w-full"
          onClick={() => setModalOpen(true)}
        >
          <div>
            <Image
              src={findUser ? findUser.userProfile : userAvatar}
              alt="user"
              width={40}
              height={40}
              className="rounded-full border w-10 h-10 object-cover object-center"
            />
          </div>
          <div className="h-10 px-4 w-full border bg-gray-200 rounded-3xl flex items-center cursor-pointer text-sm transition-all duration-300 hover:bg-gray-300">
            Click to create a post...
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[992px] xl:max-w-[1200px] max-h-[80vh] overflow-y-auto overflow-x-hidden">
        {createPostPending ? (
          <div className="flex justify-center items-center py-7 h-[50vh]">
            <RingLoader />
          </div>
        ) : (
          <form onSubmit={handleSubmit(handlePost)}>
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
            </DialogHeader>
            <div className="my-4">
              <div>
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
                        <option
                          key={category?._id}
                          value={category?._id}
                          disabled={category?.isDisabled}
                        >
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
                    className="border border-gray-300 py-1 px-2 rounded-lg w-full text-sm min-h-24"
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
              </div>
            </div>
            <DialogFooter>
              <button
                type="submit"
                className="bg-gray-900 text-white py-2 px-3 rounded-md"
              >
                Submit
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;

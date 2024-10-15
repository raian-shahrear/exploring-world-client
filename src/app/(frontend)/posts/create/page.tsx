"use client";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import JoditEditor from "jodit-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

const PostCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const handlePost: SubmitHandler<FieldValues> = async (data) => {
    const newPost = {
      title: data?.title,
      category: data?.category,
      image: selectedImages,
      travelStory: data?.travelStory,
    };

    console.log(newPost);
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

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">Create A Post</h1>
      <div>
        <form onSubmit={handleSubmit(handlePost)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">
                Post Title<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Title..."
                className="input input-bordered w-full text-sm h-9"
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
                className="select select-bordered w-full text-sm min-h-9 h-9"
                {...register("category", { required: true })}
              >
                <option value="">Select category</option>
                <option value="6706b444bf98886baeacba5d">Adventure</option>
                <option value="6706b85cbf98886baeacba60">
                  Business Travel
                </option>
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
                className="file-input file-input-bordered w-full text-sm h-9"
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
            {imagesPreview.length > 0 && (
              <div className="flex flex-wrap gap-2 border border-gray-300 border-dashed p-2 rounded-lg">
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
              className="textarea textarea-bordered w-full text-sm"
              placeholder="Travel story..."
              {...register("travelStory", { required: true })}
            ></textarea>
            {errors.travelStory && (
              <span className="text-xs text-red-600 mt-[2px] inline-block">
                This field is required
              </span>
            )}
          </div>

          <div>

          </div>

          <div>
            <button type="submit" className="btn btn-sm btn-neutral">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCreate;

import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const PostEditCommentModal = ({ id }: { id: string }) => {
  const openModal = () => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  const { register, handleSubmit } = useForm();

  const handleComment: SubmitHandler<FieldValues> = (data) => {
    console.log(data.comment);
  };
  return (
    <>
      <button onClick={openModal}>
        <MdEdit />
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <div className="grid grid-cols-[auto_14px] items-start gap-5 mb-4">
            <p className="font-bold text-lg">Edit comment for {id}</p>
            <form method="dialog">
              <button className="text-lg">
                <IoClose />
              </button>
            </form>
          </div>

          <form onSubmit={handleSubmit(handleComment)}>
            <textarea
              defaultValue={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum voluptatibus molestiae magnam! Voluptatibus corporis error, alias quasi hic quae veniam facilis enim ea, modi veritatis quaerat aut, vero iusto numquam dolore itaque. Dignissimos reprehenderit possimus asperiores cupiditate eligendi veritatis nobis nulla veniam aliquam totam porro dolor laborum, soluta quas sint."
              }
              className="min-h-20 w-full border bg-gray-100 focus-within:bg-white p-2 text-xs"
              {...register("comment")}
            />
            <button type="submit" className="btn btn-xs btn-neutral mt-2">
              Update
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default PostEditCommentModal;

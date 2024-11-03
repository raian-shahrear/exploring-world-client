import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TDisplayComment } from "@/types";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";

type TProps = {
  comment: TDisplayComment;
};

const ViewCommentModal = ({ comment }: TProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-fit px-2 py-1 text-xs">
          <HiOutlineViewfinderCircle /> View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>View Comment</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <div>
            <p className="text-base mb-2">
              <span className="font-semibold">Post Title : </span>
              {comment?.post?.title}
            </p>
            <p className="text-sm">
              <span className="block font-semibold">Comment : </span> {comment?.comment}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCommentModal;

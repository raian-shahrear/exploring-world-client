"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import { IoWarningOutline } from "react-icons/io5";
import { useState } from "react";
import { useVerifyUser } from "@/hooks/auth.hook";
import RingLoader from "../loading/RingLoader";

const VerifyUserModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    mutate: verifyUser,
    isPending: verifyUserPending,
    data: verifyUserData,
  } = useVerifyUser();

  const handleVerifyUser = () => {
    verifyUser();
  };

  if(verifyUserData?.success){
    window.location.href = verifyUserData?.data?.paymentSession?.payment_url;
  }
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setModalOpen(true)}
          className="w-fit h-fit text-orange-600 text-[11px] font-medium gap-1 bg-transparent border border-orange-600 rounded-md px-1 py-[2px] transition-all duration-300 hover:bg-gray-900 hover:border-gray-900 hover:text-white"
        >
          <IoWarningOutline /> Verify account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Verify Account</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          {verifyUserPending ? (
            <div className="flex justify-center items-center py-7">
                <RingLoader />
            </div>
          ) : (
            <div>
              <p className="text-base mb-2 text-center">
                Want to verify your account?
              </p>
              <p className="text-lg mb-4 text-center">
                Only <span className="font-semibold">BDT 100</span> will be cut
                for verification.
              </p>

              <div className="flex justify-center">
                <Button
                  className="text-sm h-fit py-1 px-2"
                  onClick={handleVerifyUser}
                >
                  Verify
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyUserModal;

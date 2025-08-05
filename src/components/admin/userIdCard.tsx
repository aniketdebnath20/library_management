"use client"

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FolderOpenDot } from "lucide-react";
import { IKImage } from "imagekitio-next";
import config from "@/src/lib/config";

const UserIdCard = ({ userImage }: { userImage: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer text-blue-400 flex items-center gap-2">View Card <FolderOpenDot className="h-5 w-5" /> </div>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="h-full w-full">
          <IKImage
            path={userImage}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt="Book cover"
            width={100}
            height={100}
            className="rounded-md w-[100%] h-[100%]"
            loading="lazy"
            lqip={{ active: true }}
          />
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default UserIdCard;

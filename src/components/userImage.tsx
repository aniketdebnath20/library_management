"use client";

import { IKImage } from "imagekitio-next";
import React from "react";
import config from "../lib/config";

const UserImage = ({ userImage }: { userImage: string }) => {
  return (
    <IKImage
      path={userImage}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      alt="Book cover"
      width={100}
      height={100}
      className="rounded-full w-[100%] h-[100%]"
      loading="lazy"
      lqip={{ active: true }}
    />
  );
};

export default UserImage;

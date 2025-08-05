"use client"

import config from "@/src/lib/config";
import { IKImage } from "imagekitio-next";
import React from "react";

const CoverImage = ({ coverImage }: { coverImage: string }) => {
  return (
    <>
      <IKImage
        path={coverImage}
        urlEndpoint={config.env.imagekit.urlEndpoint}
        alt="Book cover"
        width={70}
        height={70}
        className="rounded-md"
        loading="lazy"
        lqip={{ active: true }}
      />
    </>
  );
};

export default CoverImage;

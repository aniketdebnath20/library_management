"use client";

import { IKImage } from "imagekitio-next";

interface Props {
  urlEndpoint: string;
  path: string;
}

export default function UserCardImage({ urlEndpoint, path }: Props) {
  return (
    <div className="w-100 h-[270px]">
      <IKImage
        path={path}
        urlEndpoint={urlEndpoint}
        alt="University Card"
        className="rounded-sm w-full h-full"
        // lqip={{ active: true }}
        width={100}
        height={100}
      />
    </div>
  );
}

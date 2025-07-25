import config from "@/src/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imageKit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
    return NextResponse.json(imageKit.getAuthenticationParameters());
}
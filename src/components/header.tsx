import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "../lib/utils";
import { Session } from "next-auth";
const Header = async ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex gap-2 items-center">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <p className="text-[27px] text-white font-semibold">Book Wise</p>
      </Link>

      <ul className="flex flex-row items-center gap-5">
        <li>
          <Link href="/">
            <p className="text-[#ccc] fw-semibold">Home</p>
          </Link>
        </li>
        <li>
          <Link href="/library">
            <p className="text-[#ccc] fw-semibold">Library</p>
          </Link>
        </li>

        <li>
          <Link
            href="/my-profile"
            className="flex flex-row justify-center items-center gap-2"
          >
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
            <p className="text-[#ccc] font-bold text-sm">
              {session?.user?.name}
            </p>
          </Link>
        </li>
        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className=""
          >
            <Image
              src="/icons/logout.svg"
              alt="Logout"
              width={25}
              height={25}
            />
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;

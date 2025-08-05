import React from "react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import BookRecords from "@/src/components/admin/bookRecords";

const Page = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <p className="text-black font-bold">All Books</p>

        <BookRecords />
      </div>
    </section>
  );
};

export default Page;

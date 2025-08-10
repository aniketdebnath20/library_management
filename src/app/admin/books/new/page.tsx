import React from "react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import BookForm from "@/src/components/admin/forms/bookForm";

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="create" />
      </section>
    </>
  );
};
export default Page;

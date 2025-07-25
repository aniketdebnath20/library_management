import BookList from "@/src/components/bookList";
import BookOverview from "@/src/components/bookOverview";
import { sampleBooks } from "@/src/constants";
import React from "react";

const page = () => {
  return (
    <div>
      <BookOverview {...sampleBooks[0]} />

      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-10"
      />
    </div>
  );
};

export default page;

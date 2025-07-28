import { auth } from "@/auth";
import BookList from "@/src/components/bookList";
import BookOverview from "@/src/components/bookOverview";
import { db } from "@/src/database/drizzle";
import { books } from "@/src/database/schema";
import { Book } from "@/src/lib/type";
import { desc } from "drizzle-orm";
import React from "react";

const page = async () => {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <div>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-10"
      />
    </div>
  );
};

export default page;

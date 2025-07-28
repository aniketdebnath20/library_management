// src/components/allBooks.tsx

import React from "react";
import BookList from "@/src/components/bookList";
import { db } from "@/src/database/drizzle";
import { books } from "@/src/database/schema";
import { desc } from "drizzle-orm";
import { Book } from "@/src/lib/type";

export default async function AllBooks() {
  const latestBooks = await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt));

  return (
    <BookList
      title="Latest Books"
      books={latestBooks}
      containerClassName="mt-10"
    />
  );
}

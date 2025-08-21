// app/api/books/search/route.ts

import { db } from "@/src/database/drizzle";
import { books } from "@/src/database/schema";
import { ilike } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ books: [] });
  }

  const result = await db
    .select()
    .from(books)
    .where(ilike(books.title, `%${query}%`)) // case-insensitive LIKE
    .limit(1);

  return NextResponse.json({ books: result });

}

// import BorrowBook from "./borrowBook";

import { db } from "@/src/database/drizzle";
import { users } from "@/src/database/schema";
import { Book } from "@/src/lib/type";
import Image from "next/image";
import BookCover from "../backCover";
import { eq } from "drizzle-orm";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  console.log(userId);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return (
    <>
      <section className="book-overview">
        <div className="flex flex-1 flex-col gap-5">
          <h1 style={{ color: "#e7c9a5" }}>{title}</h1>

          <div className="book-info">
            <p className="text-gray-500">
              By <span className="font-semibold text-primary">{author}</span>
            </p>

            <p className="text-gray-500">
              Category{" "}
              <span className="font-semibold text-primary">{genre}</span>
            </p>

            <div className="flex flex-row gap-1">
              <Image src="/icons/star.svg" alt="star" width={22} height={22} />
              <p className="text-gray-500">{rating}</p>
            </div>
          </div>

          <div className="book-copies">
            <p style={{ color: "#6b7280" }}>
              Total Books <span>{totalCopies}</span>
            </p>

            <p style={{ color: "#6b7280" }}>
              Available Books <span>{availableCopies}</span>
            </p>
          </div>

          <p className="book-description text-gray-500">{description}</p>
        </div>

        <div className="relative flex flex-1 justify-center">
          <div className="relative">
            <BookCover
              variant="wide"
              className="z-10"
              coverColor={coverColor}
              coverImage={coverUrl}
            />

            <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
              <BookCover
                variant="wide"
                coverColor={coverColor}
                coverImage={coverUrl}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookOverview;

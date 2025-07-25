import React from "react";
import BookCover from "./backCover";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  cover: string;
  userId:string; 
}

interface Props extends Book {
  userId: string;
}

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  cover,
  id,
  userId,
}: Props) => {

  console.log(userId);

  return (
    <>
      <section className="book-overview">
        <div className="flex flex-1 flex-col gap-5">
          <h1>{title}</h1>

          <div className="book-info">
            <p>
              By <span className="font-semibold text-light-200">{author}</span>
            </p>

            <p>
              Category{" "}
              <span className="font-semibold text-light-200">{genre}</span>
            </p>

            <div className="flex flex-row gap-1">
              <Image src="/icons/star.svg" alt="star" width={22} height={22} />
              <p>{rating}</p>
            </div>
          </div>

          <div className="book-copies">
            <p>
              Total Books <span>{totalCopies}</span>
            </p>

            <p>
              Available Books <span>{availableCopies}</span>
            </p>
          </div>

          <p className="book-description">{description}</p>

          {/* {user && (
            <BorrowBook
              bookId={id}
              userId={userId}
              borrowingEligibility={borrowingEligibility}
            />
          )} */}
        </div>

        <div className="relative flex flex-1 justify-center">
          <div className="relative">
            <BookCover
              variant="wide"
              className="z-10"
              coverColor={coverColor}
              coverImage={cover}
            />

            <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
              <BookCover
                variant="wide"
                coverColor={coverColor}
                coverImage={cover}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookOverview;

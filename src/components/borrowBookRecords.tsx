import Link from "next/link";
import React from "react";
import BookCover from "./backCover";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { RecpitDialog } from "./recpitDialog";

interface BookProps {
  titles: string;
  mergedData: {
    id: string;
    status: "BORROWED" | "RETURNED";
    borrowDate: Date; // match the query
    dueDate: string; // match the query
    book: {
      id: string;
      title: string;
      genre: string;
      coverColor: string;
      coverUrl: string;
      author:string;
    };
    user: {
      id: string;
      name: string;
      email: string;
      universityCard: string;
    };
  }[];
}


const BorrowBookRecords = ({ titles, mergedData }: BookProps) => {
  function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <div className="flex flex-col w-full">
      <p className="text-[26px] text-amber-200 font-semibold pb-3">{titles}</p>

      {/* Scrollable book container */}
      <div className="flex gap-6 flex-wrap h-[520px] overflow-y-scroll scrollbar-hide hover:scrollbar-auto px-4 py-3 justify-around lg:justify-center xl:justify-start">
        {mergedData.map((data, index) => (
          <div
            key={index}
            className="bg-[#1c2235] rounded-xl shadow-md w-[240px] min-h-[380px] transition-all duration-300 hover:scale-[1.02] p-4"
          >
            {/* Only make book image/title clickable */}
            <Link
              href={`/books/${data.book.id}`}
              className="flex flex-col items-center"
            >
              <div
                className="px-4 py-6 rounded-2xl"
                style={{
                  backgroundColor: `${hexToRgba(data.book.coverColor, 0.7)}`,
                }}
              >
                <BookCover
                  coverColor={data.book.coverColor}
                  coverImage={data.book.coverUrl}
                />
              </div>

              <div className="mt-2 text-center">
                <p className="book-title">{data.book.title}</p>
                <p className="book-genre">{data.book.genre}</p>
              </div>
            </Link>

            {/* Book dates and dialog button (outside Link!) */}
            <div className="mt-3 w-full space-y-3">
              <div className="flex items-center gap-2 text-amber-100">
                <BookOpen className="h-5 w-5" />
                <p className="text-white text-sm">
                  Borrowed: {new Date(data.borrowDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image
                    src="/icons/calendar.svg"
                    alt="calendar"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                  <p className="text-white text-sm">
                    Due: {new Date(data.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <div
                  className="text-[snow] p-1 rounded-sm"
                  aria-label="Download"
                  style={{
                    backgroundColor: `${hexToRgba(data.book.coverColor, 0.7)}`,
                  }}
                >
                  <RecpitDialog receiptData={data} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowBookRecords;

// import Link from "next/link";
// import React from "react";
// import BookCover from "./backCover";
// import Image from "next/image";
// import { Download } from "lucide-react";

// interface BookProps {
//   titles: string;
//   mergedData: {
//     id: string;
//     userId: string;
//     bookId: string;
//     borrowDate: number;
//     dueDate: number;
//     // plus any other fields from borrowRecords
//     book: {
//       id: string;
//       title: string;
//       genre: string;
//       coverColor: string;
//       coverUrl: string;
//       // include only needed fields from books
//     };
//   }[];
// }

// const BorrowBookRecords = ({ titles, mergedData }: BookProps) => {
//   return (
//     <div className="flex flex-col">
//       <p className="text-[26px] text-amber-200 font-semibold pb-3">
//         {" "}
//         {titles}{" "}
//       </p>
//       {/* <div className="flex flex-col h-[600px] overflow-scroll"> */}
//         <div className="flex gap-20 flex-wrap h-[520px] justify-around overflow-y-scroll scrollbar-hide">
//           {mergedData.map((data, index) => (
//             <div className={`bg-${data.book.coverColor}`} key={index}>
//               <Link
//                 href={`/books/${data.book.id}`}
//                 className="w-full flex flex-col items-center"
//               >
//                 <BookCover
//                   coverColor={data.book.coverColor}
//                   coverImage={data.book.coverUrl}
//                 />

//                 <div className="mt-4 xs:max-w-40 max-w-28">
//                   <p className="book-title">{data.book.title}</p>
//                   <p className="book-genre">{data.book.genre}</p>
//                 </div>

//                 <div className="mt-3 w-full">
//                   <div className="book-loaned">
//                     <Image
//                       src="/icons/book.svg"
//                       alt="book"
//                       width={18}
//                       height={18}
//                       className="object-contain"
//                     />
//                     <p className="text-light-100">
//                       Borrowed on{" "}
//                       {new Date(data.borrowDate).toLocaleDateString()}
//                     </p>
//                   </div>

//                   <div className="book-loaned">
//                     <Image
//                       src="/icons/calendar.svg"
//                       alt="calendar"
//                       width={18}
//                       height={18}
//                       className="object-contain"
//                     />
//                     <p className="text-light-100">
//                       Due on {new Date(data.dueDate).toLocaleDateString()}
//                     </p>
//                   </div>

//                   <div className="book-btn">
//                     <Download />
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       {/* </div> */}
//     </div>
//   );
// };

// export default BorrowBookRecords;

// //   <p className="text-light-100">
// //     {typeof data.dueDate === "number"
// //       ? `${data.dueDate} days left to due`
// //       : `Due on ${new Date(data.dueDate).toLocaleDateString()}`}
// //   </p>

// BorrowBookRecords.tsx

import Link from "next/link";
import React from "react";
import BookCover from "./backCover";
import Image from "next/image";
import { Download } from "lucide-react";

interface BookProps {
  titles: string;
  mergedData: {
    id: string;
    userId: string;
    bookId: string;
    borrowDate: number;
    dueDate: number;
    book: {
      id: string;
      title: string;
      genre: string;
      coverColor: string;
      coverUrl: string;
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
      <div className="flex gap-6 flex-wrap h-[520px] overflow-y-scroll scrollbar-hide hover:scrollbar-auto px-4 justify-around">
        {mergedData.map((data, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 shadow-md w-[200px] min-h-[380px] transition-all duration-300 hover:scale-[1.02]`}
            style={{
              backgroundColor: `${hexToRgba(data.book.coverColor, 0.7)}`,
            }}
          >
            <Link
              href={`/books/${data.book.id}`}
              className="flex flex-col items-center"
            >
              {/* Book Cover */}
              <BookCover
                coverColor={data.book.coverColor}
                coverImage={data.book.coverUrl}
              />

              {/* Book Info */}
              <div className="mt-4 text-center">
                <p className="book-title">{data.book.title}</p>
                <p className="book-genre">{data.book.genre}</p>
              </div>

              {/* Dates and Download Button */}
              <div className="mt-4 w-full space-y-3">
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/book.svg"
                    alt="book"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                  <p className="text-white text-sm">
                    Borrowed: {new Date(data.borrowDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
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

                <div className="flex justify-end mt-2">
                  <button
                    className="text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Download"
                  >
                    <Download />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowBookRecords;

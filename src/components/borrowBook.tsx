// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import Image from "next/image";

// interface Props {
//   userId: string;
//   bookId: string;
//   borrowingEligibility: {
//     isEligible: boolean;
//     message: string;
//   };
// }

// const BorrowBook = ({
//   userId,
//   bookId,
//   borrowingEligibility: { isEligible, message },
// }: Props) => {
//   const router = useRouter();
//   const [borrowing, setBorrowing] = useState(false);

//   return (
//       <Button
//         className="book-overview_btn"
//         onClick={handleBorrowBook}
//         disabled={borrowing}
//       >
//         <Image src="/icons/book.svg" alt="book" width={20} height={20} />
//         <p className="font-bebas-neue text-xl text-dark-100">
//           {borrowing ? "Borrowing ..." : "Borrow Book"}
//         </p>
//       </Button>
//   );
// };

// export default BorrowBook;

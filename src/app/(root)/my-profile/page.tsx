import { auth } from "@/auth";
import { books, borrowRecords, users } from "@/src/database/schema";
import { redirect } from "next/navigation";
import config from "@/src/lib/config";
import UserCardImage from "@/src/components/usercardimage";
import { CheckCircle2 } from "lucide-react";
import { getInitials } from "@/src/lib/utils";
import { eq } from "drizzle-orm";
import { db } from "@/src/database/drizzle";
import BorrowBookRecords from "@/src/components/borrowBookRecords";

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect("/sign-in");

  const userData = await db
    .select({
      id: users.id,
      name: users.fullName,
      email: users.email,
      universityId: users.universityId,
      universityCard: users.universityCard,
    })
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  const user = userData[0];

  // 3. Get borrow records for this user
  const borrowRecordsData = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, user.id));

  console.log("Borrow records", borrowRecordsData);

  // 4. Get book info based on borrow records
  // Optional: map multiple bookIds if user has borrowed more than one book
  const borrowedBooks = await Promise.all(
    borrowRecordsData.map((record) =>
      db
        .select()
        .from(books)
        .where(eq(books.id, record.bookId))
        .then((res) => res[0])
    )
  );

  console.log("Books borrowed", borrowedBooks);

  const mergedRecords = borrowRecordsData.map((record, index) => ({
    ...record,
    book: borrowedBooks[index],
  }));

  console.log("merged the two diff data",mergedRecords);

  return (
    <>
      <div className="flex flex-col items-center justify-between align-content-center gap-5 md:flex-row">
        <main className="bg-[#1c2230] text-white flex items-center justify-center w-[-webkit-fill-available] sm:w-[60%] md:w-[40%] rounded-[40px]">
          <div className="bg-[#1c2230] rounded-2xl shadow-xl pt-6 pb-5 px-5 w-full max-w-sm relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#2b3245] w-[60px] h-[70px] rounded-b-full flex">
              <div className="h-2 w-10 bg-[#1c2235] mx-auto mt-12 rounded-sm" />
            </div>
            <div className="absolute top-4 right-2 text-green-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="flex items-center gap-4 mt-7">
              <div className="bg-amber-100 text-gray-500 text-xl w-14 h-14 rounded-full flex items-center justify-center font-semibold">
                {getInitials(session?.user?.name || "IN")}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-400 user-card email">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">University</p>
              <p className="text-base font-semibold">Book Wise</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-400">Student ID</p>
              <p className="text-lg font-bold">{user.universityId}</p>
            </div>
            <div className="mt-5">
              {user.universityCard && (
                <UserCardImage
                  path={user.universityCard}
                  urlEndpoint={config.env.imagekit.urlEndpoint}
                />
              )}
            </div>
          </div>
        </main>

        {/* <div> */}
          <BorrowBookRecords
            titles="Borrow Books"
            mergedData={mergedRecords}
          />
        {/* </div> */}
      </div>
    </>
  );
};

export default ProfilePage;

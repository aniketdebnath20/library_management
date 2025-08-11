import CoverImage from "@/src/components/admin/coverImage";
import { RecpitDialog } from "@/src/components/recpitDialog";
import UserImage from "@/src/components/userImage";
import { db } from "@/src/database/drizzle";
import { books, users, borrowRecords } from "@/src/database/schema";
import { eq } from "drizzle-orm";

export default async function BorrowRecords() {
  const borrowRecordsData = await db
    .select({
      id: borrowRecords.id,
      status: borrowRecords.status,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      book: {
        id: books.id,
        title: books.title,
        coverUrl: books.coverUrl,
      },
      user: {
        id: users.id,
        name: users.fullName,
        email: users.email,
        universityCard: users.universityCard,
      },
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .innerJoin(users, eq(borrowRecords.userId, users.id));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Borrow Book Requests
        </h1>

        {/* Table on md+ */}
        <div className="hidden md:block overflow-x-auto bg-white border border-gray-200 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 w-[22%] py-3 text-left font-semibold text-gray-600">
                  Book Title
                </th>
                <th className="px-4 w-[20%] py-3 text-left font-semibold text-gray-600">
                  User Requested
                </th>
                <th className="px-4 w-[10%] py-3 text-left font-semibold text-gray-600">
                  Borrowed Date
                </th>
                <th className="px-4 w-[8%] py-3 text-left font-semibold text-gray-600">
                  Return Date
                </th>
                <th className="px-4  w-[10%] py-3 text-left font-semibold text-gray-600">
                  Due Date
                </th>
                <th className="px-4 w-[10%] py-3 text-left font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-4 w-[8%] py-3 text-left font-semibold text-gray-600">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody>
              {borrowRecordsData.map((record, index) => (
                <tr key={index} className="border-t">
                  <td className="px-2 py-3 flex items-center gap-2">
                    <CoverImage coverImage={record.book.coverUrl} />
                    <span>{record.book.title}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10">
                        <UserImage
                          userImage={record.user.universityCard || ""}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{record.user.name}</div>
                        <div className="text-xs text-gray-500">
                          {record.user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {record.borrowDate
                      ? new Date(record.borrowDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {(() => {
                      const parseDate = (raw: unknown): Date => {
                        if (raw == null) return new Date(NaN);

                        if (typeof raw === "number") {
                          return raw > 1e12
                            ? new Date(raw)
                            : new Date(raw * 1000);
                        }

                        if (typeof raw === "string") {
                          const trimmed = raw.trim();
                          if (/^\d+$/.test(trimmed)) {
                            const num = Number(trimmed);
                            return num > 1e12
                              ? new Date(num)
                              : new Date(num * 1000);
                          }
                          return new Date(trimmed);
                        }

                        return new Date(raw as any);
                      };

                      const borrowDate = parseDate(record.borrowDate);
                      const dueDate = parseDate(record.dueDate);

                      if (
                        isNaN(borrowDate.getTime()) ||
                        isNaN(dueDate.getTime())
                      )
                        return "Invalid date";

                      const durationMs =
                        dueDate.getTime() - borrowDate.getTime();
                      const durationDays = Math.ceil(
                        durationMs / (1000 * 60 * 60 * 24)
                      );

                      return `${durationDays} day${durationDays !== 1 ? "s" : ""}`;
                    })()}
                  </td>
                  <td className="px-4 py-3">
                    {record.dueDate
                      ? new Date(record.dueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                      {record.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition">
                      <RecpitDialog receiptData={record} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card layout on small screens */}
        <div className="md:hidden space-y-4">
          {borrowRecordsData.map((record) => (
            <div
              key={record.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <CoverImage coverImage={record.book.coverUrl} />
                <div>
                  <h2 className="font-semibold">{record.book.title}</h2>
                  <p className="text-xs text-gray-500">
                    {record.borrowDate
                      ? new Date(record.borrowDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"}{" "}
                    - Due{" "}
                    {record.dueDate
                      ? new Date(record.dueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3">
                <div className="w-10 h-10 rounded-md">
                  <UserImage userImage={record.user.universityCard || ""} />
                </div>
                <div>
                  <div className="font-medium">{record.user.name}</div>
                  <div className="text-xs text-gray-500">
                    {record.user.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs">
                  {record.status}
                </span>
                <div className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition">
                  <RecpitDialog receiptData={record} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

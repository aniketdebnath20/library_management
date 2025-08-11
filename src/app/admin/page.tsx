import CoverImage from "@/src/components/admin/coverImage";
import { db } from "@/src/database/drizzle";
import { books, borrowRecords, users } from "@/src/database/schema";
import { desc, eq, sql } from "drizzle-orm";
import Link from "next/link";

export default async function page() {
  // Fetch last 4 borrow records
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
        author: books.author,
        category: books.genre,
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
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .orderBy(desc(borrowRecords.createdAt))
    .limit(4);

  // Counts
  const [totalBorrowedBooks] = await db
    .select({ count: sql<number>`count(*)` })
    .from(borrowRecords);

  const [totalUsers] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users);

  const [totalBooks] = await db
    .select({ count: sql<number>`count(*)` })
    .from(books);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 font-sans">
      <main className="flex-1 p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Borrowed Books</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-2xl font-semibold">
                {totalBorrowedBooks.count}
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Total Users</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-2xl font-semibold">
                {totalUsers.count}
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-500">Total Books</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-2xl font-semibold">
                {totalBooks.count}
              </div>
            </div>
          </div>
        </div>

        {/* Borrow Requests & Recently Added */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Borrow Requests */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Borrow Requests</h2>
              <Link href="/admin/book-requests" className="text-blue-500 text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {borrowRecordsData.map((book, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-14 h-14 bg-gray-200 rounded">
                    <CoverImage coverImage={book.book.coverUrl} />
                  </div>
                  <div className="flex-1">
                    <Link href={`/admin/book-requests`}>
                      <div className="font-medium">{book.book.title}</div>
                    </Link>
                    <div className="text-xs text-gray-500">
                      {book.book.author} • {book.book.category}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {book.user.name} •{" "}
                      {new Date(book.dueDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Added */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recently Added Books</h2>
              <Link href="/admin/books" className="text-blue-500 text-sm">
                View All
              </Link>
            </div>
            <Link
              href="/admin/books/new"
              className="w-full flex items-center justify-center border border-dashed border-gray-300 py-2 rounded text-gray-500 hover:bg-gray-50 mb-4"
            >
              + Add New Book
            </Link>
            <div className="space-y-4">
              {borrowRecordsData.map((book, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-14 h-14 rounded">
                    <CoverImage coverImage={book.book.coverUrl} />
                  </div>
                  <div className="flex-1">
                    <Link href={`/admin/bookView/${book.book.id}`}>
                      <div className="font-medium">{book.book.title}</div>
                    </Link>
                    <div className="text-xs text-gray-500">
                      {book.book.author} • {book.book.category}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(book.borrowDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

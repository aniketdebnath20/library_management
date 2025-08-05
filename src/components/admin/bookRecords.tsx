import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { auth } from "@/auth";
import { db } from "@/src/database/drizzle";
import { books } from "@/src/database/schema";
import { Book } from "@/src/lib/type";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import CoverImage from "./coverImage";

const BookRecords = async () => {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))) as Book[];

  if (!session) return redirect("/sign-up");

  return (
    <div className="w-full">
      <div className="hidden md:block overflow-x-auto">
        <table className="table-fixed w-full text-sm text-left bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-[30%] px-4 py-3 font-semibold text-gray-500">
                Book Title
              </th>
              <th className="w-[15%] px-4 py-3 font-semibold text-gray-500">
                Author
              </th>
              <th className="w-[15%] px-4 py-3 font-semibold text-gray-500">
                Genre
              </th>
              <th className="w-[15%] px-4 py-3 font-semibold text-gray-500">
                Date Created
              </th>
              <th className="w-[10%] px-4 py-3 font-semibold text-gray-500">
                View
              </th>
              <th className="w-[15%] px-4 py-3 font-semibold text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {latestBooks.map((book) => (
              <tr key={book.id} className="border-b last:border-none">
                {/* Book Title + Cover Image */}
                <td className="w-[30%] px-4 py-4">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <CoverImage coverImage={book.coverUrl} />
                    <span className="truncate block">
                      {book.title.length < 30
                        ? book.title
                        : `${book.title.slice(0, 30)}..`}
                    </span>
                  </div>
                </td>

                {/* Author */}
                <td className="w-[15%] px-4 py-4 truncate">
                  {book.author.length < 20
                    ? book.author
                    : `${book.author.slice(0, 20)}..`}
                </td>

                {/* Genre */}
                <td className="w-[15%] px-4 py-4 truncate">
                  {book.genre.length < 13
                    ? book.genre
                    : `${book.genre.slice(0, 13)}..`}
                </td>

                {/* Date */}
                <td className="w-[15%] px-4 py-4">
                  {book.createdAt
                    ? `${new Date(book.createdAt).getFullYear()} - ${new Date(book.createdAt).getDate()}`
                    : "N/A"}
                </td>

                {/* View Button */}
                <td className="w-[10%] px-4 py-4">
                  <Link href={`/admin/bookView/${book.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </td>

                {/* Icons */}
                <td className="w-[15%] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Pencil
                      className="text-blue-600 cursor-pointer"
                      size={16}
                    />
                    <Trash2 className="text-red-600 cursor-pointer" size={16} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {latestBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-sm rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <CoverImage coverImage={book.coverUrl} />
              <div className="font-medium text-sm">
                {book.title.length < 20
                  ? book.title
                  : `${book.title.slice(0, 20)}..`}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              <div>
                <strong>Author:</strong> {book.author}
              </div>
              <div>
                <strong>Genre:</strong> {book.genre}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {book.createdAt
                  ? `${new Date(book.createdAt).getFullYear()} - ${new Date(book.createdAt).getDate()}`
                  : "N/A"}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Link href={`/admin/bookView/${book.id}`}>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
              <div className="flex gap-3">
                <Pencil className="text-blue-600 cursor-pointer" size={16} />
                <Trash2 className="text-red-600 cursor-pointer" size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRecords;

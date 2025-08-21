"use client";

import { useEffect, useState } from "react";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import BookCover from "@/src/components/backCover";
import { Book } from "@/src/lib/type";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  if (
    search == null ||
    search.length > 0 ||
    search.trim() === "" ||
    search === undefined
  ) {
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        if (search.trim()) {
          fetch(`/api/books?q=${search}`)
            .then((res) => res.json())
            .then((data) => setFilteredBooks(data.books));
        } else {
          setFilteredBooks([]);
        }
      }, 300);

      return () => clearTimeout(delayDebounce);
    }, [search]);
  }
  
  return (
    <>
      <div className="library">
        <h3 className="library-subtitle">Discover your next great read</h3>
        <h3 className="library-title">
          Explore And Search For{" "}
          <span className="text-amber-200"> Any Book </span> In Our Library
        </h3>

        <div className="search">
          <Image
            src="./icons/search-fill.svg"
            alt="Search Icon"
            width={25}
            height={25}
          />

          <Input
            name="search"
            type="text"
            placeholder="Search books..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-content-center align-content-center">
        {filteredBooks.length > 0 ? (
          <ul className="grid grid-cols-2 gap-4">
            {filteredBooks.map((book) => (
              <li key={book.id} className="xs:w-52 w-full">
                <Link
                  href={`/books/${book.id}`}
                  className="w-full flex flex-col items-center"
                >
                  <BookCover
                    coverColor={book.coverColor}
                    coverImage={book.coverUrl}
                  />

                  <div className="xs:max-w-40 max-w-28">
                    <p className="book-title">{book.title}</p>
                    <p className="book-genre">{book.genre}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          search && (
            <p className="text-gray-500 text-[16px] w-100 mx-auto">
              No books found for “{search}”.
            </p>
          )
        )}
      </div>
    </>
  );
}

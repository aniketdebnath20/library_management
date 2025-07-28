import React from "react";
import BookCard from "./bookCard";
import { Book } from "../lib/type";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  if (!books || books.length === 0 || books.length < 2) {
    return <div className={containerClassName}>No books available</div>;
  }

  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;

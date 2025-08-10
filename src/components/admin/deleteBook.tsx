"use client";

import { toast } from "@/src/hook/use-toast";
import { deleteBook } from "@/src/lib/admin/actions/book";
import { Trash2 } from "lucide-react";
import React from "react";

const DeleteBook = ({ bookId }: { bookId: string }) => {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    const result = await deleteBook(id);

    if (result.success) {
      toast({ title: "Deleted", description: "Book removed successfully" });
      // router.refresh(); // Reload the page data
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Trash2
        className="text-red-600 cursor-pointer"
        size={16}
        onClick={() => handleDelete(bookId)}
      />
    </div>
  );
};

export default DeleteBook;

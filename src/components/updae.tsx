"use client";
import { Pencil } from "lucide-react";
import React from "react";
import BookForm from "./admin/forms/bookForm";
import { redirect } from "next/navigation";

const Updae = () => {



  return (
    <div>
      <Pencil className="text-blue-600 cursor-pointer" size={16} onClick={redirect("/admin/books/new")} />
    </div>
  );
};

export default Updae;

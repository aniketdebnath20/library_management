import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 rounded-md bg-white border border-gray-200 px-3 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-blue-500">
      <Search className="text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder="Search users, books by title, author, or genre"
        className="w-80 border-none p-0 text-sm focus:outline-none focus:ring-0 focus:border-none"
      />
    </div>
  );
};

export default SearchBar;

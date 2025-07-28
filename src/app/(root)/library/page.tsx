// src/app/(root)/library/page.tsx

import AllBooks from "@/src/components/allBooks";
import SearchBar from "@/src/components/searchbar";

export default function LibraryPage() {
  return (
    <>
      <SearchBar />
      <AllBooks />
    </>
  );
}

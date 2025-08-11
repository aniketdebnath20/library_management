import BookForm from "@/src/components/admin/forms/bookForm";
import { Button } from "@/src/components/ui/button";
import { db } from "@/src/database/drizzle";
import { books } from "@/src/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

const EditBookPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const bookData = await db.select().from(books).where(eq(books.id, id));

  if (!bookData) return notFound();

  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <BookForm type="update" {...bookData[0]} />
    </>
  );
};

export default EditBookPage;

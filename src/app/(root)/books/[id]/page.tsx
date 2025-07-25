import { auth } from "@/auth";
import BookOverview from "@/src/components/bookOverview";
import BookVideo from "@/src/components/bookVideo";
import { sampleBooks } from "@/src/constants";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const bookDetails= ...sampleBooks;

  return (
    <>
      <BookOverview {...sampleBooks} userId={session?.user?.id as string} />
    
     <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>

            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/*  SIMILAR*/}
      </div>
    
    </>
  );
};

export default page;

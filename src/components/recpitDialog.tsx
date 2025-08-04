"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FileDown } from "lucide-react";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ReceiptProps {
  receiptData: {
    id: string;
    userId: string;
    bookId: string;
    borrowDate: number;
    dueDate: number;
    book: {
      id: string;
      title: string;
      genre: string;
      coverColor: string;
      coverUrl: string;
      author: string;
    };
  };
}

export function RecpitDialog({ receiptData }: ReceiptProps) {
  const data = receiptData;

  const handleImageDownload = async () => {
    const element = document.getElementById("receipt-content");

    if (!element) {
      console.error("Receipt element not found");
      return;
    }

    // html2canvas with better quality
    const canvas = await html2canvas(element, {
      scale: 1, // Higher scale for better resolution
      backgroundColor: "#1f2937", // A solid dark background matching your dialog
      useCORS: true, // If you load external images
      allowTaint: true, // Allow cross-origin images (if needed)
      logging: false,
    });

    // Convert to PNG
    const imgData = canvas.toDataURL("image/png");

    // Download link
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `BookWise_Receipt_${data.id}.png`;
    link.click();
  };

  return (
    <Dialog>
      <form className="border-none">
        <DialogTrigger asChild>
          <FileDown
            className="h-5 w-5 cursor-pointer"
            onClick={handleImageDownload}
          />
        </DialogTrigger>

        <DialogContent
          id="receipt-content"
          className="sm:max-w-[425px] bg-gray-700"
        >
          <DialogHeader>
            <DialogTitle>
              <div className="flex gap-2 items-center">
                <Image
                  src="/icons/logo.svg"
                  alt="logo"
                  width={40}
                  height={40}
                />
                <span className="text-[27px] text-white font-semibold">
                  Book Wise
                </span>
              </div>
            </DialogTitle>

            <DialogTitle className="pt-6 text-[22px] text-white font-semibold">
              Borrow Receipt
            </DialogTitle>

            <DialogDescription asChild>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>
                  <p className="text-[#ccc] pl-1">
                    Receipt ID:{" "}
                    <span className="text-amber-200">{data.id}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[#ccc] pl-1">
                    Date Issued:{" "}
                    <span className="text-amber-200">
                      {new Date(data.borrowDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <hr />

          <main className="grid gap-4 text-sm pt-5 text-white">
            <div>
              <h2 className="text-md font-semibold mb-4">Book Details</h2>

              <div className="flex justify-between gap-5">
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[#ccc] text-sm">Title:</p>
                    <div className="font-bold">{data.book.title}</div>
                  </div>

                  <div>
                    <p className="text-[#ccc] text-sm">Category:</p>
                    <div className="font-bold">{data.book.genre}</div>
                  </div>

                  <div>
                    <p className="text-[#ccc] text-sm">Due Date:</p>
                    <div className="font-bold">
                      {new Date(data.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[#ccc] text-sm">Author:</p>
                    <div className="font-bold">{data.book.author}</div>
                  </div>

                  <div>
                    <p className="text-[#ccc] text-sm">Borrowed on:</p>
                    <div className="font-bold">
                      {new Date(data.borrowDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <p className="text-[#ccc] text-sm">Duration:</p>
                    <div className="font-bold">
                      {(() => {
                        const parseDate = (raw: unknown): Date => {
                          if (raw == null) return new Date(NaN);

                          if (typeof raw === "number") {
                            return raw > 1e12
                              ? new Date(raw)
                              : new Date(raw * 1000);
                          }

                          if (typeof raw === "string") {
                            const trimmed = raw.trim();
                            if (/^\d+$/.test(trimmed)) {
                              const num = Number(trimmed);
                              return num > 1e12
                                ? new Date(num)
                                : new Date(num * 1000);
                            }
                            return new Date(trimmed);
                          }

                          return new Date(raw as any);
                        };

                        const borrowDate = parseDate(data.borrowDate);
                        const dueDate = parseDate(data.dueDate);

                        if (
                          isNaN(borrowDate.getTime()) ||
                          isNaN(dueDate.getTime())
                        )
                          return "Invalid date";

                        const durationMs =
                          dueDate.getTime() - borrowDate.getTime();
                        const durationDays = Math.ceil(
                          durationMs / (1000 * 60 * 60 * 24)
                        );

                        return `${durationDays} day${durationDays !== 1 ? "s" : ""}`;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-muted" />

            <div className="p-3">
              <DialogTitle className="text-base">Terms</DialogTitle>
              <DialogDescription asChild>
                <ul className="list-disc pl-5 space-y-1 text-white text-sm">
                  <li>Please return the book by the due date.</li>
                  <li>Lost or damaged books may incur replacement costs.</li>
                </ul>
              </DialogDescription>
            </div>
          </main>

          <DialogFooter>
            <div className="text-xs text-center text-muted-foreground text-white">
              Thank you for using{" "}
              <span className="text-amber-100 font-semibold">BookWise</span>.
              For any questions, contact us at{" "}
              <span className="text-amber-100 font-semibold">
                support@bookwise.com
              </span>
              .
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

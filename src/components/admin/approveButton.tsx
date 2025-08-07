"use client";

import { useState } from "react";

const ApproveButton = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/approve-status", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to approve");

      window.location.reload(); // or refresh router if using Next.js router
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      className="px-4 py-2 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-all flex items-center gap-1"
    >
      {loading ? "Approving..." : "Approve Account"}
    </button>
  );
};

export default ApproveButton;

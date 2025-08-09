"use client";

import { useState } from "react";

const ApproveButton = ({
  userId,
  userStatus,
}: {
  userId: string;
  userStatus: any;
}) => {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status: "APPROVED" | "REJECTED") => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/approve-status", {
        method: "POST",
        body: JSON.stringify({ userId, status }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update status");

      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {userStatus === "REJECTED" || userStatus === "PENDING" ? (
        <button
          onClick={() => updateStatus("APPROVED")}
          disabled={loading}
          className="px-4 py-2 w-full text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-all flex items-center justify-center gap-1"
        >
          {loading ? "Approving..." : "Approve Account"}
        </button>
      ) : (
        <button
          onClick={() => updateStatus("REJECTED")}
          disabled={loading}
          className="px-4 w-full py-2 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-all flex items-center justify-center gap-1"
        >
          {loading ? "Rejecting..." : "Reject Account"}
        </button>
      )}
    </>
  );
};

export default ApproveButton;

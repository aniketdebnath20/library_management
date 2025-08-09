import ApproveButton from "@/src/components/admin/approveButton";
import UserIdCard from "@/src/components/admin/userIdCard";
import { db } from "@/src/database/drizzle";
import { users } from "@/src/database/schema";
import { desc } from "drizzle-orm";
import React from "react";

const pages = async () => {
  const userData = await db.select().from(users).orderBy(desc(users.createdAt));

  const getStatusClasses = (status: any) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border rounded-lg">
        <table className="min-w-full table-fixed text-sm bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-[25%] px-4 py-3 text-left font-medium text-gray-500">
                Name
              </th>
              <th className="w-[14%] px-4 py-3 text-left font-medium text-gray-500">
                Date Joined
              </th>
              <th className="w-[15%] px-4 py-3 text-left font-medium text-gray-500">
                University ID No
              </th>
              <th className="w-[20%] px-4 py-3 text-left font-medium text-gray-500">
                University ID Card
              </th>
              <th className="w-[10%] px-4 py-3 text-left font-medium text-gray-500">
                Status
              </th>
              <th className="w-[15%] px-4 py-3 text-left font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id} className="border-b last:border-none">
                <td className="px-4 py-3">{user.fullName}</td>
                <td className="px-4 py-3">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </td>
                <td className="px-4 py-3">{user.universityId}</td>
                <td className="px-4 py-3">
                  <UserIdCard userImage={user.universityCard} />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-md px-4 py-2 text-xs font-medium ${getStatusClasses(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <ApproveButton userId={user.id} userStatus={user.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {userData.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-sm rounded-lg border p-4 space-y-2"
          >
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date Joined</p>
              <p className="font-medium">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">University ID No</p>
              <p className="font-medium">{user.universityId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">University ID Card</p>
              <UserIdCard userImage={user.universityCard} />
            </div>
            <div>
              <p className="text-sm text-gray-500 pb-2">Status</p>
              <span
                className={`inline-block rounded-md px-4 py-2 text-xs font-medium ${getStatusClasses(user.status)}`}
              >
                {user.status}
              </span>
            </div>
            <div>
                <ApproveButton userId={user.id} userStatus={user.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default pages;

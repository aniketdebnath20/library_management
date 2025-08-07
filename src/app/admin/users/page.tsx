import UserIdCard from "@/src/components/admin/userIdCard";
import { UserRole } from "@/src/components/admin/userRole";
import { db } from "@/src/database/drizzle";
import { users } from "@/src/database/schema";
import { desc } from "drizzle-orm";
import React from "react";

const pages = async () => {
  const userData = await db.select().from(users).orderBy(desc(users.createdAt));

  return (
    <>
      <div className="w-full">
        <div className="hidden md:block overflow-x-auto border rounded-lg">
          <table className="min-w-full table-fixed text-sm bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-[20%] px-4 py-3 text-left font-medium text-gray-500">
                  Name
                </th>
                <th className="w-[20%] px-4 py-3 text-left font-medium text-gray-500">
                  Date Joined
                </th>
                <th className="w-[15%] px-4 py-3 text-left font-medium text-gray-500">
                  Role
                </th>
                <th className="w-[20%] px-4 py-3 text-left font-medium text-gray-500">
                  University ID No
                </th>
                <th className="w-[25%] px-4 py-3 text-left font-medium text-gray-500">
                  University ID Card
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id} className="border-b last:border-none">
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">
                    {" "}
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {user.role && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                        <UserRole userId={user.id} userRole={user.role} />
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{user.universityId}</td>
                  {/* <CoverImage coverImage={user.universityCard} /> */}
                  <td className="px-4 py-3">
                    <UserIdCard userImage={user.universityCard} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
          {userData.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg p-4 bg-white shadow-sm space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-medium">{user.fullName}</span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${
                user.role === "ADMIN"
                  ? "bg-green-100 text-green-700"
                  : "bg-pink-100 text-pink-700"
              }`}
                >
                  {user.role}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <div>
                  <strong>Date Joined:</strong>{" "}
                  {user.createdAt
                    ? `${new Date(user.createdAt).getFullYear()} - ${new Date(user.createdAt).getDate()}`
                    : "N/A"}
                </div>
                <div>
                  <strong>University ID No:</strong> {user.universityId}
                </div>
              </div>
              <div>
                <div
                  className="text-blue-500 hover:underline text-sm"
                  rel="noreferrer"
                >
                  <UserIdCard userImage={user.universityCard} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default pages;

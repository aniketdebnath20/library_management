"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "@/src/hook/use-toast";

interface UserRoleProps {
  userId: string;
  userRole: "USER" | "ADMIN";
}

export function UserRole({ userId, userRole }: UserRoleProps) {
  const [role, setRole] = useState<"USER" | "ADMIN">(userRole);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = async (newRole: "USER" | "ADMIN") => {
    setRole(newRole); // Optimistic UI update
    setLoading(true);

    try {
      const res = await fetch("/api/admin/updateRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          role: newRole,
        }),
      });

      if (!res.ok) throw new Error("Failed to update role");
      toast({
        title: "Success",
        description: "Role updated successfully",
        className: "bg-green-600 text-white",
      });
      // Optional: show toast here
    } catch (error) {
      toast({
        title: "Failed",
        description: "Could not update role",
        className: "bg-red-600 text-white",
      });
      console.error("Error updating role:", error);
      // Optional: show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`p-[3px] cursor-pointer rounded px-2 min-w-[60px] text-center"
              ${
                role === "ADMIN"
                  ? "bg-green-100 text-green-700"
                  : "bg-pink-100 text-pink-700"
              }`}
        >
          {loading ? "..." : role === "USER" ? "User" : "Admin"}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Define Role</DropdownMenuLabel>
        <DropdownMenuGroup>
          {role === "USER" ? null : (
            <DropdownMenuItem onClick={() => handleRoleChange("USER")}>
              User
            </DropdownMenuItem>
          )}
          {role === "USER" ? (
            <DropdownMenuItem onClick={() => handleRoleChange("ADMIN")}>
              Admin
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

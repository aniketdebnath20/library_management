import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/src/database/drizzle";
import { users } from "@/src/database/schema";

export async function POST(req: Request) {
  try {
    const { userId, role } = await req.json();

    if (
      !userId ||
      !role ||
      !["USER", "ADMIN"].includes(role) // strict role check (optional but safe)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid parameters" },
        { status: 400 }
      );
    }

    await db
      .update(users)
      .set({ role }) // role is assumed to be enum "USER" | "ADMIN"
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Role update failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

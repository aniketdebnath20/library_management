// /api/admin/approve-status/route.ts
import { db } from "@/src/database/drizzle";
import { users } from "@/src/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, status } = await req.json(); // status should be "APPROVED" or "REJECTED"

    await db.update(users).set({ status }).where(eq(users.id, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Approval error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

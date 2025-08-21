import { auth } from "@/auth";
import Header from "@/src/components/header";
import { db } from "@/src/database/drizzle";
import { users } from "@/src/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

 after(async () => {
    if (!session?.user?.id) return;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));
  });

  return (
    <main className="root-container">
      <div style={{ maxWidth: "1450px", marginInline: "auto" }}>
        <Header session={session} />
        <div className="mt-[50px] pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;

"use server";

import { eq } from "drizzle-orm";
import { db } from "@/src/database/drizzle";
import { users } from "@/src/database/schema";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/src/lib/ratelimit";
import { redirect } from "next/navigation";
import { AuthCredentials } from "@/src/lib/type";
import { hash } from "bcryptjs";
import { workflowClient } from "../workflow";
import config from "../config";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, password, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    // // Trigger the onboarding workflow
    // await workflowClient.trigger({
    //   url: `${config.env.apiEndpoint}/api/workflow/onboarding`,
    //   body: {
    //     email,
    //     fullName,
    //   },
    // });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
};
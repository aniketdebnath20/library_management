'use client';

import { auth } from "@/auth";
import { db } from "@/src/database/drizzle";
import { users } from "@/src/database/schema";
import config from "@/src/lib/config";
import { eq } from "drizzle-orm";
import { IKImage, ImageKitProvider } from "imagekitio-next";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect("/sign-in");

  const userData = await db
    .select({
      name: users.fullName,
      email: users.email,
      universityId: users.universityId,
      universityCard: users.universityCard,
    })
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  const user = userData[0];

  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-dark-800 p-6 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-light-100">My Profile</h1>

        <div className="space-y-4 text-light-300">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>University ID:</strong> {user.universityId}
          </p>

          <div className="mt-4">
            <strong>University Card:</strong>
            <div className="mt-2"></div>

            <ImageKitProvider
              publicKey={config.env.imagekit.publicKey}
              urlEndpoint={config.env.imagekit.urlEndpoint}
            >
              <IKImage
                path={user.universityCard}
                alt="sorry server error"
                className="w-full rounded-xl"
              />
            </ImageKitProvider>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

import { currentUser, auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return auth().redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }
  const email = user.emailAddresses[0].emailAddress;
  const userFirstName = user.firstName || email.split("@")[0];
  const userLastName =
    user.lastName || Math.floor(Math.random() * 100).toString();
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${userFirstName} ${userLastName}`,
      imageUrl: user.imageUrl,
      email,
    },
  });
};

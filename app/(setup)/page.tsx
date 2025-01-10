import { InitialModal } from "@/components/modals/initial-modals";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetUpPage = async () => {
  const profile = await initialProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  //possible error
  const server = await db.server.findFirst({
    where: {
      Members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <InitialModal />;
};

export default SetUpPage;

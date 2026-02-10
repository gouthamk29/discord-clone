export const dynamic = "force-dynamic";
import { currentProfile } from "@/lib/current-profile";

import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(res: Request) {
  try {
    const { name, imageUrl } = await res.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        Channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        Members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("SERVER[POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

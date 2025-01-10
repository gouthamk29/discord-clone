import { Member, Profile, Server } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { Server as SockerIOServer } from "socket.io";
import { NextApiResponse } from "next";

export type ServerWithMembersWithProfile = Server & {
  Members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SockerIOServer;
    };
  };
};

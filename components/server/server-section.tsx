"use client";

import { ServerWithMembersWithProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-model-store";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType?: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfile;
}

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2 ">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600  dark:hover:text-zinc-300"
            onClick={() => onOpen("createChannel", { channelType })}
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}

      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600  dark:hover:text-zinc-300"
            onClick={() => onOpen("members", { server })}
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

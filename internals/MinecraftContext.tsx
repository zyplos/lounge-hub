import { createContext, useContext } from "react";
import useSWR from "swr";
import type {
  MinecraftStatusAPIResponse,
  MinecraftServerResponse,
} from "./apiTypes";

export type MinecraftContextStateValue = MinecraftServerResponse | null;

interface MinecraftContextState {
  vanilla: MinecraftContextStateValue;
  modded: MinecraftContextStateValue;
}

const DEFAULT_CONTEXT_VALUE = {
  vanilla: null,
  modded: null,
};

const MinecraftContext = createContext<MinecraftContextState>(
  DEFAULT_CONTEXT_VALUE
);
MinecraftContext.displayName = "MinecraftContext";

export function MinecraftDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = useSWR<MinecraftStatusAPIResponse>(
    "/api/minecraft/status",
    {
      refreshInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  if (error) {
    console.error("MinecraftContext error", error);
  }

  return (
    <MinecraftContext value={data || DEFAULT_CONTEXT_VALUE}>
      {children}
    </MinecraftContext>
  );
}

export const useMinecraftData = () => useContext(MinecraftContext);

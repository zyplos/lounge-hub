import { createContext, useContext } from "react";
import useSWR from "swr";
import type { MinecraftServerStatusResult } from "./apiTypes";

export interface MinecraftDataContextState {
  vanilla: MinecraftServerStatusResult | null;
  modded: MinecraftServerStatusResult | null;
}

const MinecraftContext = createContext<MinecraftDataContextState>({
  vanilla: null,
  modded: null,
});
MinecraftContext.displayName = "MinecraftContext";

export function MinecraftDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = useSWR("/api/minecraft/status", {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  return (
    <MinecraftContext.Provider value={error || data}>
      {children}
    </MinecraftContext.Provider>
  );
}

export const useMinecraftData = () => useContext(MinecraftContext);

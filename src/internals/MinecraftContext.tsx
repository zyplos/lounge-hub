import { createContext, useContext } from "react";
import useSWR from "swr";

export interface MinecraftDataContextState {
  vanilla: null | any;
  modded: null | any;
}

const MinecraftContext = createContext({
  vanilla: null,
  modded: null,
});
MinecraftContext.displayName = "MinecraftContext";

export function MinecraftDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = useSWR("/api/minecraft/status-bugfix", {
    refreshInterval: 60000,
  });
  return (
    <MinecraftContext.Provider value={error || data}>
      {children}
    </MinecraftContext.Provider>
  );
}

export const useMinecraftData = () => useContext(MinecraftContext);

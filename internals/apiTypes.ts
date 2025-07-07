export interface MinecraftServerStatus {
  version: {
    name: string;
  };
  favicon?: string;
  description?:
    | string
    | {
        text: string;
      };
  players: {
    max: number;
    online: number;
    sample?: {
      id: string;
      name: string;
    }[];
  };
}

export type MinecraftServerStatusResult =
  | MinecraftServerStatus
  | { message: string };

export interface MinecraftStatusAPIResponse {
  vanilla: MinecraftServerStatusResult;
  modded: MinecraftServerStatusResult;
}


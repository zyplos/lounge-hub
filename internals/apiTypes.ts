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

/*
notes
/api/minecraft/status                   | status                            | server status
/api/minecraft/players/[name]           | player                            | player data
/api/minecraft/players/[name]/claims    | chunkByUUID                       | land claims
/api/minecraft/chunk                    | chunkByCoords/logEntryBgCoords    | chunk owner data
*/

export interface ApiError {
  errorMessage: string;
}

export interface Player {
  player_id: string; // uuid
  name: string;
  joined: string; // datetime string
  community_id: number | null;
  home_x: number | null;
  home_y: number | null;
  home_z: number | null;
  home_dimension: string | null; // uuid
  home_hidden: boolean;
}

export interface Chunk {
  chunk_id: number;
  player_id: string; // uuid
  claimed_on: string; // datetime string
  x: number;
  z: number;
  dimension: string; // uuid
}


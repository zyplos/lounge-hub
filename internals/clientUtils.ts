export interface CommunityInfoData {
  [id: number]: {
    name: string;
    mainColor: string;
    textColor: string;
  };
}

export const CommunityInfoMap: CommunityInfoData = {
  1: {
    name: "the lounge",
    mainColor: "#ff3e3e",
    textColor: "#fff",
  },
  2: { name: "3 AM", mainColor: "#00a3a3", textColor: "#c5fffe" },
  3: {
    name: "pegg",
    mainColor: "#0094ff",
    textColor: "#fff",
  },
  4: { name: "blaster's circle", mainColor: "#7c00ff", textColor: "#fff" },
  5: {
    name: "The ultimate Mob Psycho fan club",
    mainColor: "#35dd44",
    textColor: "#0d3907",
  },
  6: { name: "vold group", mainColor: "#d8b01a", textColor: "#312700" },
  7: { name: "cali's circle", mainColor: "#9F68B4", textColor: "#e6dbf4" },
  8: { name: "UIC OW", mainColor: "#f06414", textColor: "#3e1500" },
  99: { name: "Friend of Friend", mainColor: "#444", textColor: "#fff" },
};

export const worldUUIDs = {
  overworld: "11e52781-9149-4b29-accb-6acfb3d9f071",
  nether: "884d7c09-52e1-42a4-8a2a-7a21dfc49bc8",
  end: "ed0d5979-be3b-4ba6-a9b3-b3126e306ff1",
  aether: "6fdffaa4-66c9-40ca-ae14-489711eee5e3",
};

export const DimensionNameMap = {
  [worldUUIDs.overworld]: "The Overworld",
  [worldUUIDs.nether]: "The Nether",
  [worldUUIDs.end]: "The End",
  [worldUUIDs.aether]: "The Aether",
};

export const DimensionInternalNameMap = {
  [worldUUIDs.overworld]: "world",
  [worldUUIDs.nether]: "nether",
  [worldUUIDs.end]: "end",
  [worldUUIDs.aether]: "aether",
};

export const DimensionColorMap = {
  [worldUUIDs.overworld]: "#41BC49",
  [worldUUIDs.nether]: "#B81E1E",
  [worldUUIDs.end]: "#C9B979",
  [worldUUIDs.aether]: "#6CBAE8",
};

export const mapUrlBase = process.env.NEXT_PUBLIC_MAP_VANILLA_URL_BASE;

export function findChunkCenter(cx: number, cz: number) {
  const x = cx * 16 + 8;
  const z = cz * 16 + 8;
  return { x, y: 90, z };
}

export function prettyPrintDateAndTime(date: Date) {
  return date.toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function prettyPrintDate(date: Date) {
  return date.toLocaleDateString("en-US");
}

/**
 * width is 128 by default. don't use this with next/image
 */
export function getPlayerFaceUrl(uuid: string, width = 128) {
  return `https://vzge.me/face/${width}/${uuid}`;
}

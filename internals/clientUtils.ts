export const CommunityIdMap: { [key: number]: string } = {
  1: "the lounge",
  2: "3 AM",
  3: "3DS Rock Rock Mountain",
  4: "blaster's circle",
  5: "The ultimate Mob Psycho fan club",
  6: "vold group",
  99: "Friend of Friend",
};

export const CommunityColorMap: { [key: number]: string } = {
  1: "#ff3e3e",
  2: "#00a3a3",
  3: "#0094ff",
  4: "#7c00ff",
  5: "#d2d42a",
  6: "#d8b01a",
  99: "#919191",
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

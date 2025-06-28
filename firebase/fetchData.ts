import admin from "./index"; // Assuming admin is correctly typed in index.ts
import { DataSnapshot } from "firebase-admin/database";

// Define the structure of the user data stored in Firebase
// This is an assumption; adjust based on actual data structure
interface LoungeUserData {
  vc?: boolean;
  // Add other known properties of loungeusers here
  // e.g., username?: string;
  //       points?: number;
  [key: string]: any; // Allow other dynamic properties if necessary
}

export const getProfileData = async (discordID: string): Promise<LoungeUserData | null> => {
  if (!discordID) {
    console.error("getProfileData: discordID is undefined or empty.");
    return null;
  }

  const dbRef = admin.database().ref();
  const userRef = dbRef.child("loungeusers").child(discordID);

  let snapshot: DataSnapshot;
  try {
    snapshot = await userRef.get();
  } catch (error) {
    console.error(`Firebase error fetching data for ${discordID}:`, error);
    return null;
  }

  if (!snapshot.exists()) {
    // console.log(`No data found for discordID: ${discordID}`);
    return null;
  }

  // snapshot.val() can return any, so cast to our defined type
  const data = snapshot.val() as LoungeUserData | null;

  // It's possible snapshot.val() is null even if snapshot.exists() is true (e.g. value is explicitly null in DB)
  if (data === null) {
    // console.log(`Data is null for discordID: ${discordID} despite snapshot existing.`);
    return null;
  }

  // The original code modifies the data and saves it back.
  // This seems like an odd pattern for a "get" function.
  // If this is intended as an update-on-read, it should be documented or reconsidered.
  // For now, replicating the behavior.
  const updatedData: LoungeUserData = { ...data, vc: true };

  try {
    await userRef.set(updatedData);
  } catch (error) {
    console.error(`Firebase error setting data for ${discordID}:`, error);
    // Decide if we should return the original data, null, or throw, if set fails.
    // Original function returns snapshot.val() which would be the data *before* this attempted update.
    // Returning the data before this specific 'vc: true' update attempt:
    return data;
  }

  // The original function returns snapshot.val(), which is the data *before* the `vc: true` update.
  // If the intent is to return the data *after* the `vc: true` update, it should be `updatedData`.
  // Sticking to original behavior of returning the initial snapshot.val().
  return data;
};

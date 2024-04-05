import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0xe7EE16b6Cd943A0348d682c9B2E734c1e3F18E7a", "edition-drop");
    await editionDrop.createBatch([
      {
        name: "OASIS Citizen",
        description: "This NFT will give you access to OASIS Labs DAO!",
        image: readFileSync("scripts/assets/oasis_citizen.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
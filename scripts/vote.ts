import { ethers, getChainId } from "hardhat";
import { CustomGovernor } from "../typechain-types";
import fs from "fs";
import path from "path";
import { mineBlocks } from "./utils/utils";

async function vote(proposalIndex: number) {
  const governor = await ethers.getContract<CustomGovernor>("CustomGovernor");

  // there should be nothing in proposals.json, not even quotes
  const root = path.resolve(__dirname, "..");
  const json = path.join(root, "/", "proposals.json");

  const proposals = JSON.parse(fs.readFileSync(json, "utf8"));

  // find the proposal by index
  const proposalId = proposals[(await getChainId()).toString()][proposalIndex];

  const tx = await governor.castVoteWithReason(
    proposalId,
    1,
    "I like this proposal"
  );
  await tx.wait();
  console.log(await governor.state(proposalId));

  await mineBlocks(7);
  console.log(await governor.state(proposalId));
}

/* the numbers 1 and 4 in the console after running indicate the state from oz:
1 - Pendenig
2 - Active
3 - Canceled
4 - Succeeded
5 - Queued
6 - Expired
7 - Executed */

vote(0)
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

import fs from "fs";
import path from "path";
import { mineBlocks } from "./utils/utils";
import { ethers, getChainId } from "hardhat";
import { CustomGovernor, Storage } from "../typechain-types";

// script that proposes a tx through governance
// voting in progress (vote.ts),
// queue and execute transaction (queue-execute.ts)

// proposal for governance
async function propose(args: number[], func: string, description: string) {
  const governor = await ethers.getContract<CustomGovernor>("CustomGovernor");
  const storage = await ethers.getContract<Storage>("Storage");

  console.log(
    `Proposing to call ${func} with ${args}. Description: ${description}`
  );

  // encode data for a low-level call from oz
  const encFuncCall = (storage.interface as any).encodeFunctionData(func, args);

  const proposeTx = await governor.propose(
    [storage.address],
    [0],
    [encFuncCall],
    description
  );

  const proposalData = await proposeTx.wait();
  await mineBlocks(2);
  const proposalId = proposalData.events?.[0].args?.proposalId.toString();
  const root = path.resolve(__dirname, "..");
  const json = path.join(root, "/", "proposals.json");

  const proposals = JSON.parse(fs.readFileSync(json, "utf8"));
  proposals[(await getChainId()).toString()].push(proposalId);

  fs.writeFileSync(json, JSON.stringify(proposals));
}

propose([42], "store", "Let's store 42!")
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

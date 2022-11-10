import { ethers, getChainId } from "hardhat";
import { CustomGovernor } from "../typechain-types";
import fs from "fs";
import path from "path";
import { mineBlocks } from "./utils/utils";

// в proposals.json не должно быть ничего, даже кавычек
async function vote(proposalIndex: number) {
    const governor = await ethers.getContract<CustomGovernor>("CustomGovernor");

    const root = path.resolve(__dirname, "..");
    const json = path.join(root, "/", "proposals.json");

    const proposals = JSON.parse(fs.readFileSync(json, "utf8"));

    // находим предложение по индексу
    const proposalId = proposals[(await getChainId()).toString()][proposalIndex];

    const tx = await governor.castVoteWithReason(proposalId, 1, "I like this proposal");
    await tx.wait();
    console.log(await governor.state(proposalId));

    await mineBlocks(7);
    console.log(await governor.state(proposalId));
}

/* числа 1 и 4 в консоли после запуска означают состояние из oz:
1 - Pendenig
2 - Active
3 - Canceled
4 - Succeeded
5 - Queued
6 - Expired
7 - Executed */


vote(0).
    then(() => process.exit(0)).
    catch((e) => {
        console.error(e);
        process.exit(1);
    });
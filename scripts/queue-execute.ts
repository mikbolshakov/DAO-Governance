import { ethers } from "hardhat";
import { CustomGovernor } from "../typechain-types";
import { mineBlocks, timeTravel } from "./utils/utils";

// голосовение завершилось, ставим tx в очередь и выполняем
async function queueExecute(args: number[], func: string, description: string) {
    const governor = await ethers.getContract<CustomGovernor>("CustomGovernor");
    const storage = await ethers.getContract<Storage>("Storage");

    const encFuncCall = (storage.interface as any).encodeFunctionData(
        func,
        args
    );

    const descHash = ethers.utils.solidityKeccak256(["string"], [description])
    const queueTx = await governor.queue(
        [storage.address],
        [0],
        [encFuncCall],
        descHash
    );
    await queueTx.wait();

    await timeTravel(3601);
    await mineBlocks(1);

    const executeTx = await governor.execute(
        [storage.address],
        [0],
        [encFuncCall],
        descHash
    );
    await executeTx.wait();
    console.log((await storage.read()).toString());
}

queueExecute([42], "store", "Let's store 42!")
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

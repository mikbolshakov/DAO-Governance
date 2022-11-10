import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Timelock, CustomGovernor } from "../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
  
    // тоже подключаемся к задеплоиным ск, только в отличие от get с доступом к функциям
    const governor = await hre.ethers.getContract<CustomGovernor>(
        "CustomGovernor",
        deployer
    );
    const timelock = await hre.ethers.getContract<Timelock>(
        "Timelock",
        deployer
    );
    
    // выдаем нужные роли
    const proposer = await timelock.PROPOSER_ROLE();
    const propTx = await timelock.grantRole(proposer, governor.address);
    await propTx.wait();

    const executor = await timelock.EXECUTOR_ROLE();
    const execTx = await timelock.grantRole(executor, hre.ethers.constants.AddressZero);
    await execTx.wait();

    const admin = await timelock.TIMELOCK_ADMIN_ROLE();
    const admTx = await timelock.revokeRole(admin, deployer);
    await admTx.wait();
}

export default func;
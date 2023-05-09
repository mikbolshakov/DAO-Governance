import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  // using "get" we get the addresses of the deployed contracts
  const governToken = await get("GovernToken");
  const timelockContr = await get("Timelock");

  // specify the time in blocks (so in OZ), one block = 10-13 sec
  const delay = 1;
  const votingPeriod = 6;
  const quorum = 4;

  await deploy("CustomGovernor", {
    from: deployer,
    log: true,
    args: [
      governToken.address,
      timelockContr.address,
      delay,
      votingPeriod,
      quorum,
    ],
  });
};

export default func;

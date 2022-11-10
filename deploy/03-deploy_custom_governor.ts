import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy, get } = deployments;
    const { deployer } = await getNamedAccounts();
  
    // с помощью get подключаем к задеплоиным контрактам 01 и 02
    // можем получить адреса контрактов, но выполнять функции не получится
    const governToken = await get("GovernToken"); 
    const timelockContr = await get("Timelock");

    // время указываем в блоках (так в oz), один блок = 13 сек
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
            quorum
        ]
    });
}

export default func;
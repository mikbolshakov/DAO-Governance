import chaiModule from "chai";
import { chaiEthers } from "chai-ethers";
//разовая настройка для тестов
chaiModule.use(chaiEthers);
export = chaiModule;
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// решение из oz, которое прошло аудит 
// контракт, который ставит транзакции в очередь правильным образом (если прошло голосование)
// владельцем этого ск (как и Storage.sol) будет CustomGovernor.sol
import "@openzeppelin/contracts/governance/TimelockController.sol";

contract Timelock is TimelockController {
    constructor(
        uint _minDelay, // мин задержка простоя транзакции в очереди (чтобы несогласные успели выйти из системы)
        address[] memory _proposers, // те, кто могут что-то предлагать
        address[] memory _executors, // те, кто могут что-то выполнять
        address admin // тот, кто может выполнять любые функции
    ) TimelockController(_minDelay, _proposers, _executors, admin) {}
}
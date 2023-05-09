// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// audited OZ solution
// contract that queues transactions in the correct way (if voted)
// the owner of this contract (as well as Storage.sol) will be CustomGovernor.sol
import "@openzeppelin/contracts/governance/TimelockController.sol";

contract Timelock is TimelockController {
    constructor(
        uint _minDelay, // min transaction idle delay in the queue (so that dissenters have time to log out)
        address[] memory _proposers, // can put the proposal to the vote
        address[] memory _executors, // can do something
        address admin // execute any functions
    ) TimelockController(_minDelay, _proposers, _executors, admin) {}
}

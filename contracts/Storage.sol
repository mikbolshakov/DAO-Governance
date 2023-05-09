// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

// an example of a contract that will be controlled by another contract (and will be the owner)
// in our case, the owner will be Timelock.sol
// any functions can be here: mint tokens, transfer, etc.
contract Storage is Ownable {
    uint myVal;

    event Stored(uint newVal);

    function store(uint _newVal) external onlyOwner {
        myVal = _newVal;
        emit Stored(myVal);
    }

    function read() external view returns (uint) {
        return myVal;
    }
}

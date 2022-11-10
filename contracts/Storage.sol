// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

// пример ск, которым будет управлять другй ск (и будет owner'ом) 
// в нашем случае - владельцем будет Timelock.sol
// здесь могут быть любые функции: выпуск токенов, для перевода и тд
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

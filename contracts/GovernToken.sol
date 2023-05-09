// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// superstructure over the ERC20 standard, including voting
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

// a simple OZ token, using it, dao participants will vote for certain initiatives
contract GovernToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("GovernToken", "GTK") ERC20Permit("GovernToken") {
        _mint(msg.sender, _maxSupply());
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(
        address to,
        uint amount
    ) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(
        address account,
        uint amount
    ) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}

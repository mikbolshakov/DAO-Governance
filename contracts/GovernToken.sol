// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// сложная надстройка над стандартом erc20, включающая голосование
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

// простой токен, наследующий все свои функции из openzeppelin
// с помощью него участники dao будут голосовать за те или иные инициативы
contract GovernToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("GovernToken", "GTK") ERC20Permit("GovernToken") {
        _mint(msg.sender, _maxSupply());
    }

    // добавляем эту функцию для корректной работы стандартов
    function _afterTokenTransfer(address from, address to, uint amount) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}

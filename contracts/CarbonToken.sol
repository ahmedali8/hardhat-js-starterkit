// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.1/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CarbonToken is ERC20 {
    constructor() ERC20("CARBON", "CRB")  {
        _mint(_msgSender(), 300000000 * (10 ** uint256(decimals())));
    }

    function faucet(address _account, uint256 _amount) public {
        _mint(_account, _amount);
    }
}
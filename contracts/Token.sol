// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 *@title ERC20 Token contract
 *@author Ahmed Ali <github.com/ahmedali8>
 *@notice You can use this contract for creation of ERC20 token
 */
contract Token is ERC20 {
    /**
     * @dev Initializes `ERC20` token.
     *
     * @param _name string - name of token
     * @param _symbol string - symbol of token
     * @param _totalSupply uint256 - total supply of token
     * @param _beneficiary address - address of beneficiary to receive totalsupply of tokens
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        address _beneficiary
    ) ERC20(_name, _symbol) {
        _mint(_beneficiary, _totalSupply);
    }

    /**
     * @dev Mints `_amount` ERC20 tokens to `_account`.
     * @param _account address - address of beneficiary to receive tokens
     * @param _amount uint256 - amount of tokens to receive
     */
    function mint(address _account, uint256 _amount) public {
        _mint(_account, _amount);
    }
}

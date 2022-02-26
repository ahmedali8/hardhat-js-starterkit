# Hardhat Starterkit Template (JavaScript)

#### Inspiration - [Solidity Template](https://github.com/paulrberg/solidity-template)

- [Hardhat](https://github.com/nomiclabs/hardhat): compile and run the smart contracts on a local development network
- [Ethers](https://github.com/ethers-io/ethers.js/): Ethereum library and wallet implementation
- [Waffle](https://github.com/EthWorks/Waffle): tooling for writing comprehensive smart contract tests
- [Solhint](https://github.com/protofire/solhint): linter
- [Solcover](https://github.com/sc-forks/solidity-coverage): code coverage
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity): code formatter

This is a GitHub template, which means you can reuse it as many times as you want. You can do that by clicking the "Use this
template" button at the top of the page.

## Usage

### Pre Requisites

Before running any command, you need to create a `.env` file and set all necassary environment variables.
Follow the example in `.env.example`. You can either use mnemonic or individual private keys by setting

```sh
$ ACCOUNT_TYPE="MNEMONIC"
or
$ ACCOUNT_TYPE="PRIVATE_KEYS"
```

If you don't already have a mnemonic, use this [website](https://iancoleman.io/bip39/) to generate one Or if you don't already have a private key, use this [website](https://vanity-eth.tk/) to generate one.

Then, proceed with installing dependencies:

```sh
$ yarn install
```

### Run a Hardhat chain

To run a local network with all your contracts in it, run the following:

```
$ yarn chain
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### Lint Solidity

Lint the Solidity code:

```sh
$ yarn lint:sol
```

### Test

Run the Mocha tests:

```sh
$ yarn test
```

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
```

### Report Gas

See the gas usage per unit test and average gas per method call:

```sh
$ REPORT_GAS=true yarn test
```

Optional:

- See the actual fiat currency rates by setting your coingecko api key from [here](https://coinmarketcap.com/api/pricing/) in `.env` file or command.

- Set custom gas price (gwei) in `.env` file or command or let it automatically fetched by ethgasstationapi.

```sh
$ GAS_PRICE=20
$ COIN_MARKET_CAP_API_KEY="your_api_key"
$ yarn test
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```sh
$ yarn clean
```

### Deploy

Deploy the contracts to Hardhat Network:

```sh
$ yarn deploy
```

Deploy the contracts to a specific network, such as the Rinkeby testnet:

```sh
$ yarn deploy:network rinkeby
```

### Generate Natspec Doc

Generate natspec documentation for your contracts by runing

```
$ yarn docgen
```

For more information on Natspec [click here](https://docs.soliditylang.org/en/v0.8.12/natspec-format.html#natspec) and for hardhat docgen [click here](https://github.com/ItsNickBarry/hardhat-docgen)

### View Contracts Size

```
$ yarn size
```

or turn on for every compile

```
$ CONTRACT_SIZER=true
```

## Verify Contract

### Manual Verify

```sh
$ npx hardhat verify --network <network> DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1" "Constructor argument 2"
```

For complex arguments you can refer [here](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)

```sh
$ npx hardhat verify --contract contracts/CONTRACT_NAME.sol:CONTRACT_NAME --network <network> --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
```

### Verify Contract Programmatically

Verify the contract using `verifyContract` function in [verify.js](https://github.com/ahmedali8/hardhat-starterkit/blob/main/utils/verify.js)

Set etherscan/bscscan/polygonscan api key in `.env` file or using command, refer to `.env.example` for more insight.

```sh
$ ETHERSCAN_API_KEY="your_api_key"
```

If you don't already have an api key, use either of one [etherscan](https://etherscan.io/), [bscscan](https://bscscan.com/), [polygonscan](https://polygonscan.com/) according to the network you want. 

Example deploy script with `verifyContract` function is [here](https://github.com/ahmedali8/hardhat-starterkit/blob/main/scripts/deploy.js)

## Additional Tasks

### flatfile

We often need to flatten our code for verification purposes or any other but the existing default `flatten` task requires manual copy-paste from terminal
and creation of whatever file extension we want but we can automate the creation of the flatten file by using a new `flatfile` task and providing the
contract name with `--contract` flag

```sh
$ npx hardhat flatfile --contract CONTRACT_NAME
or
$ yarn flatfile:contract CONTRACT_NAME
```

where, `CONTRACT_NAME` can be for example `TestingContract`

## Syntax Highlighting

If you use VSCode, you can enjoy syntax highlighting for your Solidity code via the
[vscode-solidity](https://github.com/juanfranblanco/vscode-solidity) extension. The recommended approach to set the
compiler version is to add the following fields to your VSCode user settings or in workspace settings json file:

```json
{
  "solidity.compileUsingRemoteVersion": "v0.8.4+commit.c7e474f2",
  "solidity.defaultCompiler": "remote"
}
```

Where of course `v0.8.4+commit.c7e474f2` can be replaced with any other version.

## Contributing

Contributions are always welcome! Open a PR or an issue!

## Thank You!

## Resources

- [Hardhat Documentation](https://hardhat.org/getting-started/)

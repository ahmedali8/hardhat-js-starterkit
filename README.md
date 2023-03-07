# Hardhat Starterkit (JavaScript) [![Open in Gitpod][gitpod-badge]][gitpod] [![Github Actions][gha-badge]][gha] [![Hardhat][hardhat-badge]][hardhat]

[gitpod]: https://gitpod.io/#https://github.com/ahmedali8/hardhat-js-starterkit
[gitpod-badge]:
  https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-FFB45B?logo=gitpod
[gha]: https://github.com/ahmedali8/hardhat-js-starterkit/actions
[gha-badge]:
  https://github.com/ahmedali8/hardhat-js-starterkit/actions/workflows/ci.yml/badge.svg
[hardhat]: https://hardhat.org/
[hardhat-badge]: https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C.svg

A Hardhat-based template for developing Solidity smart contracts, with sensible
defaults.

#### Inspiration - [Hardhat Template](https://github.com/paulrberg/hardhat-template) and [Hardhat TS Template](https://github.com/ahmedali8/hardhat-ts-template)

- [Hardhat](https://github.com/nomiclabs/hardhat): compile, run and test smart
  contracts
- [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library
  and wallet implementation
- [Solhint](https://github.com/protofire/solhint): code linter
- [Solcover](https://github.com/sc-forks/solidity-coverage): code coverage
- [Prettier Plugin Solidity](https://github.com/prettier-solidity/prettier-plugin-solidity):
  code formatter

## Getting Started

Click the
[`Use this template`](https://github.com/ahmedali8/hardhat-js-starterkit/generate)
button at the top of the page to create a new repository with this repo as the
initial state.

## Features

This template builds upon the frameworks and libraries mentioned above, so for
details about their specific features, please consult their respective
documentations.

For example, for Hardhat, you can refer to the
[Hardhat Tutorial](https://hardhat.org/tutorial) and the
[Hardhat Docs](https://hardhat.org/docs). You might be in particular interested
in reading the
[Testing Contracts](https://hardhat.org/tutorial/testing-contracts) section.

### Sensible Defaults

This template comes with sensible default configurations in the following files:

```text
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .solcover.js
├── .solhintignore
├── .solhint.json
├── .yarnrc.yml
└── hardhat.config.js
```

### GitHub Actions

This template comes with GitHub Actions pre-configured. Your contracts will be
linted and tested on every push and pull request made to the `main` branch.

Note though that by default it injects `.env.example` env variables into github
action's `$GITHUB_ENV`.

You can edit the CI script in
[.github/workflows/ci.yml](./.github/workflows/ci.yml).

## Usage

### Pre Requisites

Before running any command, you need to create a `.env` file and set all
necessary environment variables. Follow the example in `.env.example`. You can
either use mnemonic or individual private keys by setting

```sh
$ ACCOUNT_TYPE="MNEMONIC" (Default)
or
$ ACCOUNT_TYPE="PRIVATE_KEYS"
```

If you don't already have a mnemonic, use this
[mnemonic-website](https://iancoleman.io/bip39/) to generate one Or if you don't
already have a private key, use this
[privatekey-website](https://vanity-eth.tk/) to generate one.

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

### Test

Run the tests with Hardhat:

```sh
$ yarn test

or

$ yarn test:gas         # shows gas report and contract size

or

$ yarn test:trace       # shows logs + calls

or

$ yarn test:fulltrace   # shows logs + calls + sloads + sstores
```

Optional:

- See the actual fiat currency rates by setting your coingecko api key from
  [here](https://coinmarketcap.com/api/pricing/) in `.env` file or command.

- Set custom gas price (gwei) in `.env` file or command or let it automatically
  fetched by ethgasstationapi.

```sh
$ GAS_PRICE=20
$ COIN_MARKET_CAP_API_KEY="your_api_key"
```

### Lint Solidity

Lint the Solidity code:

```sh
$ yarn lint:sol
```

### Forking mainnet

Starts a local hardhat chain with the state of the last `mainnet` block

```
$ yarn fork
```

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
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

Deploy the contracts to a specific network, such as the Goerli testnet:

```sh
$ yarn deploy:network goerli
```

### Generate Natspec Doc

Generate natspec documentation for your contracts by runing

```
$ yarn dodoc
```

For more information on Natspec
[click here](https://docs.soliditylang.org/en/v0.8.12/natspec-format.html#natspec)
and for dodoc repo
[click here](https://github.com/primitivefinance/primitive-dodoc)

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

For complex arguments you can refer
[here](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)

```sh
$ npx hardhat verify --contract contracts/CONTRACT_NAME.sol:CONTRACT_NAME --network <network> --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
```

### Verify Contract Programmatically

Verify the contract using `verifyContract` function in
[verify.js](./utils/verify.js)

Set block explorer api key in `.env` file or using command, refer to
`.env.example` for more insight.

Example deploy script with `verifyContract` function is
[here](./scripts/deploy.js)

## Syntax Highlighting

If you use VSCode, you can enjoy syntax highlighting for your Solidity code via
the [vscode-solidity](https://github.com/juanfranblanco/vscode-solidity)
extension.

## Using GitPod

[GitPod](https://www.gitpod.io/) is an open-source developer platform for remote
development.

To view the coverage report generated by `yarn coverage`, just click `Go Live`
from the status bar to turn the server on/off.

## Contributing

Contributions are always welcome! Open a PR or an issue!

## Thank You!

## Resources

- [Hardhat Documentation](https://hardhat.org/getting-started/)

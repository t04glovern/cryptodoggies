<div align = "center">
    <h1>CryptoDoggies <em>DApp</em></h1>
    <p>Purchase your favorite Doggies on the blockchain.</p>
    <a href="https://www.ethereum.org/" target="_blank"><img src="https://img.shields.io/badge/Ethereum-ETH-blue.svg" alt="Ethereum"></a>
    <a href="https://solidity.readthedocs.io" target="_blank"><img src="https://img.shields.io/badge/Solidity-%5E0.4.18-blue.svg" alt="Solidity"></a>
    <a href="https://nodejs.org/" target="_blank"><img src="https://img.shields.io/badge/Node.js-%5E9.2.0-blue.svg" alt="Node.js"></a>
</div>

## About

This repository houses the [cryptodoggies.store](http://cryptodoggies.store)'s smart contract system. It has been built using Ethereum smart contracts.

This DApp was written as part of my Introduction to DApp development course available at [http://learn.cryptodoggies.store](http://learn.cryptodoggies.store)

## Developing This Contract

In order to develop this contract the following steps were taken to setup the environment.

Install and run Ganache CLI (formally you would have used TestRPC). Alternatively you can install [Ganche](http://truffleframework.com/ganache/) UI.

```
$ npm install -g ganache-cli
$ ganache-cli
```

When you run Ganache you'll be presented with 10 accounts with private keys. The RPC service that you can interact with the blockchain through is also available on `localhost:8545` for the CLI version and `localhost:7545` for the GUI.

Navigate into the root of this project and install truffle (if you haven't already got it). Run the truffle test command to compile and test the contracts.

```bash
npm install -g truffle
npm run test
npm run dev
```

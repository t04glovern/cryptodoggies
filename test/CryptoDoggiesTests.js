/* eslint no-undef: "off" */
var CryptoDoggies = artifacts.require('CryptoDoggies');

contract('CryptoDoggies', function (accounts) {
  var helpfulFunctions = require('./utils/CryptoDoggiesUtils')(CryptoDoggies, accounts);
  var hfn = Object.keys(helpfulFunctions);
  for (var i = 0; i < hfn.length; i++) {
    global[hfn[i]] = helpfulFunctions[hfn[i]];
  }

  /** Accounts
   * ---------------------------------------------------
   * | ID | Address                                    |
   * |----|--------------------------------------------|
   * | 0  | 0x627306090abaB3A6e1400e9345bC60c78a8BEf57 |
   * | 1  | 0xf17f52151EbEF6C7334FAD080c5704D77216b732 |
   * | 2  | 0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef |
   * | 3  | 0x821aEa9a577a9b44299B9c15c88cf3087F3b5544 |
   * | 4  | 0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2 |
   * | 5  | 0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e |
   * | 6  | 0x2191eF87E392377ec08E7c08Eb105Ef5448eCED5 |
   * | 7  | 0x0F4F2Ac550A1b4e2280d04c21cEa7EBD822934b5 |
   * | 8  | 0x6330A553Fc93768F612722BB8c2eC78aC90B3bbc |
   * | 9  | 0x5AEDA56215b167893e80B4fE645BA6d5Bab767DE |
   * ---------------------------------------------------
   */

  checksTotalSupply(0);

  for (x = 0; x < 100; x++) {
    checkDoggyCreation('Doggy' + x);
  }

  for (x = 0; x < 100; x++) {
    checkDoggyPurchase(x, 0.01);
  }

  checkWithdrawal(1.0);
});

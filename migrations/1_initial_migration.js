var Migrations = artifacts.require('lifecycle/Migrations.sol');

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};

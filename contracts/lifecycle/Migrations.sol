pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title Migrations
 * @dev This is a truffle contract, needed for truffle integration.
 */
contract Migrations is Ownable {
    uint256 public lastCompletedMigration;

    function setCompleted(uint256 completed) public onlyOwner {
        lastCompletedMigration = completed;
    }

    function upgrade(address newAddress) public onlyOwner {
        Migrations upgraded = Migrations(newAddress);
        upgraded.setCompleted(lastCompletedMigration);
    }
}

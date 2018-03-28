module.exports = function (CryptoDoggies, accounts) {
  // checks whether the expected value of totalSupply is the current value
  function checksTotalSupply (expectedValue) {
    it('totalSupply should be equal to ' + expectedValue, function (done) {
      CryptoDoggies.deployed().then(function (instance) {
        instance.totalSupply.call().then(function (totalSupply) {
        assert.equal(totalSupply, expectedValue
          , 'totalSupply is not equal to ' + expectedValue);
        }).then(done).catch(done);
      });
    });
  };

  function checkDoggyCreation (name) {
    it('createToken should create a random doggy named ' + name, function (done) {
      CryptoDoggies.deployed().then(async function (instance) {
        await instance.createToken(name, { from: accounts[0] })
        .then(function (result) {
          assert.include(result.logs[0].event, 'TokenCreated', 'TokenCreated event was not triggered');
          assert.equal(result.logs[0].args.name, name);
        });
      }).then(done).catch(done);
    });
  };

  function checkDoggyPurchase (tokenId, price) {
    it('purchase should allow us to buy doggy tokenId: ' + tokenId, function (done) {
      CryptoDoggies.deployed().then(async function (instance) {
        await instance.purchase(tokenId, {
          from: accounts[0],
          value: web3.toWei(price, 'ether')
        })
        .then(function (result) {
          assert.include(result.logs[0].event, 'Transfer', 'Transfer event was not triggered');
          assert.equal(result.logs[0].args._tokenId, tokenId);
          assert.include(result.logs[1].event, 'TokenSold', 'TokenSold event was not triggered');
          assert.equal(result.logs[1].args.tokenId, tokenId);
          // Confirm new contract balance
          var contractBalance = web3.fromWei(web3.eth.getBalance(instance.address), 'ether');
          console.log('\t' + contractBalance.valueOf() + ' eth');
        });
      }).then(done).catch(done);
    });
  };

  function checkWithdrawal (withdrawAmount) {
    it('withdrawBalance should withdraw ' + withdrawAmount + ' eth', function (done) {
      CryptoDoggies.deployed().then(function (instance) {
        instance.withdrawBalance(accounts[0], web3.toWei(withdrawAmount, 'ether'), {
          from: accounts[0]
        })
        .then(function (result) {
            var contractBalance = web3.fromWei(web3.eth.getBalance(instance.address), 'ether');
            assert.equal(contractBalance, 0.0);
        });
      }).then(done).catch(done);
    });
  };

  return {
  /** Token Details */
    checksTotalSupply: checksTotalSupply,
    checkDoggyCreation: checkDoggyCreation,
    checkDoggyPurchase: checkDoggyPurchase,
    checkWithdrawal: checkWithdrawal
  };
};

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
			});
		}).then(done).catch(done);
	  });
	};

	return {
	/** Token Details */
	  checksTotalSupply: checksTotalSupply,
	  checkDoggyCreation: checkDoggyCreation,
	};
  };


function loadDoggy(doggyId, doggyName, doggyDna, doggyPrice, doggyNextPrice, ownerAddress, locallyOwned) {
  var cardRow = $('#card-row');
  var cardTemplate = $('#card-template');

  if (locallyOwned) {
    cardTemplate.find('.btn-buy').attr('disabled', true);
  } else {
    cardTemplate.find('.btn-buy').removeAttr('disabled');
  }

  cardTemplate.find('.doggy-name').text(doggyName);
  cardTemplate.find('.doggy-canvas').attr('id', "doggy-canvas-" + doggyId);
  cardTemplate.find('.doggy-dna').text(doggyDna);
  cardTemplate.find('.doggy-owner').text(ownerAddress);
  cardTemplate.find('.doggy-owner').attr("href", "https://etherscan.io/address/" + ownerAddress);
  cardTemplate.find('.btn-buy').attr('data-id', doggyId);
  cardTemplate.find('.doggy-price').text(parseFloat(doggyPrice).toFixed(4));
  cardTemplate.find('.doggy-next-price').text(parseFloat(doggyNextPrice).toFixed(4));

  cardRow.append(cardTemplate.html());
  generateDoggyImage(doggyDna, 3, "doggy-canvas-" + doggyId);
}

function generateDoggyImage(doggyId, size, canvas){
  size = size || 10;
  var data = doggyidparser(doggyId);
  var canvas = document.getElementById(canvas);
  canvas.width = size * data.length;
  canvas.height = size * data[1].length;
  var ctx = canvas.getContext("2d");

  for(var i = 0; i < data.length; i++){
      for(var j = 0; j < data[i].length; j++){
          var color = data[i][j];
          if(color){
          ctx.fillStyle = color;
          ctx.fillRect(i * size, j * size, size, size);
          }
      }
  }
  return canvas.toDataURL();
}

var App = {
  contracts: {},
  CryptoDoggiesAddress: '0x383Bf1fD04D0901bbD674A580E0A621FCBb4799b',

  init() {
    return App.initWeb3();
  },

  initWeb3() {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    return App.initContract();
  },

  initContract() {
    $.getJSON('CryptoDoggies.json', (data) => {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      const CryptoDoggiesArtifact = data;
      App.contracts.CryptoDoggies = TruffleContract(CryptoDoggiesArtifact);

      // Set the provider for our contract
      App.contracts.CryptoDoggies.setProvider(web3.currentProvider);

      // User our contract to retrieve the adrians that can be bought
      return App.loadDoggies();
  });
  return App.bindEvents();
  },

  loadDoggies() {
    web3.eth.getAccounts(function(err, accounts) {
      if (err != null) {
        console.error("An error occurred: " + err);
      } else if (accounts.length == 0) {
        console.log("User is not logged in to MetaMask");
      } else {
        // Remove existing cards
        $('#card-row').children().remove();
      }
    });
    // Get local address so we don't display our owned items
    var address = web3.eth.defaultAccount;
    let contractInstance = App.contracts.CryptoDoggies.at(App.CryptoDoggiesAddress);
    return totalSupply = contractInstance.totalSupply().then((supply) => {
      for (var i = 0; i < supply; i++) {
        App.getDoggyDetails(i, address);
      }
    }).catch((err) => {
      console.log(err.message);
    });
  },

  getDoggyDetails(doggyId, localAddress) {
    let contractInstance = App.contracts.CryptoDoggies.at(App.CryptoDoggiesAddress);
    return contractInstance.getToken(doggyId).then((doggy) => {
      var doggyJson = {
        'doggyId'        	: doggyId,
        'doggyName'      	: doggy[0],
        'doggyDna'				: doggy[1],
        'doggyPrice' 			: web3.fromWei(doggy[2]).toNumber(),
        'doggyNextPrice' 	: web3.fromWei(doggy[3]).toNumber(),
        'ownerAddress'    : doggy[4]
      };
      // Check to see if we own the given Doggy
      if (doggyJson.ownerAddress !== localAddress) {
        loadDoggy(
          doggyJson.doggyId,
          doggyJson.doggyName,
          doggyJson.doggyDna,
          doggyJson.doggyPrice,
          doggyJson.doggyNextPrice,
          doggyJson.ownerAddress,
          false
        );
      } else {
        loadDoggy(
          doggyJson.doggyId,
          doggyJson.doggyName,
          doggyJson.doggyDna,
          doggyJson.doggyPrice,
          doggyJson.doggyNextPrice,
          doggyJson.ownerAddress,
          true
        );
      }
    }).catch((err) => {
      console.log(err.message);
    })
  },

  handlePurchase(event) {
    event.preventDefault();

    // Get the form fields
    var doggyId = parseInt($(event.target.elements).closest('.btn-buy').data('id'));

    web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      let contractInstance = App.contracts.CryptoDoggies.at(App.CryptoDoggiesAddress);
      contractInstance.priceOf(doggyId).then((price) => {
        return contractInstance.purchase(doggyId, {
          from: account,
          value: price,
        }).then(result => App.loadDoggies()).catch((err) => {
          console.log(err.message);
        });
      });
    });
  },

  /** Event Bindings for Form submits */
  bindEvents() {
    $(document).on('submit', 'form.doggy-purchase', App.handlePurchase);
  },
};

jQuery(document).ready(
  function ($) {
    App.init();
  }
);

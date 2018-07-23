const R = require('ramda');

const balance = [{
    "hash": "30e9636bc249f288139651d60f67c110c3ca4c3dd30ddfa3cbcec7bb13f14fd4",
    "symbol": "申一股份",
    "amount": "0"
  }

  , {
    "hash": "a52e3e99b6c2dd2312a94c635c050b4c2bc2485fcb924eecb615852bd534a63f",
    "symbol": "申一币",
    "amount": "10"
  }

  , {
    "hash": "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b",
    "symbol": "NEO",
    "amount": "0"
  }

  , {
    "hash": "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7",
    "symbol": "GAS",
    "amount": "0"
  }

  , {
    "hash": "a721d5893480260bd28ca1f395f2c465d0b5b1c2",
    "symbol": "NRVE",
    "amount": "0"
  }

  , {
    "hash": "0000000000000000000000000000000000000002",
    "symbol": "ontology-ONG",
    "amount": "0"
  }

  , {
    "hash": "0000000000000000000000000000000000000001",
    "symbol": "ontology-ONT",
    "amount": "0"
  }

  , {
    "hash": "7f86d61ff377f1b12e589a5907152b57e2ad9a7a",
    "symbol": "ACAT",
    "amount": "0"
  }

  , {
    "hash": "a0777c3ce2b169d4a23bcba4565e3225a0122d95",
    "symbol": "APH",
    "amount": "0"
  }

  , {
    "hash": "7cd338644833db2fd8824c410e364890d179e6f8",
    "symbol": "APT",
    "amount": "0"
  }


]

const diff = function (a, b) {
  return a.symbol[0] > b.symbol[0];
};
const result = R.sort(diff, balance)

console.log('result', result)

const seas = R.find(R.propEq('symbol', '申一股份'))(result);
const seac = R.find(R.propEq('symbol', '申一币'))(result);
const neo = R.find(R.propEq('symbol', 'NEO'))(result);
const gas = R.find(R.propEq('symbol', 'GAS'))(result);

const s = new Set();

s.add(seas);
s.add(seac);
s.add(neo);
s.add(gas);


result.forEach(item => {
  s.add(item);
})

console.log('s', s)

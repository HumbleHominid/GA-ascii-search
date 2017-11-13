module.exports = function(dnaData = []) {
  this.dnaData = dnaData;

  this.toString = toString;
  this.reproduce = reproduce;

  return this;
}

function toString() {
  return this.dnaData.join('');
}

function reproduce(other) {
  let offspring = [];
  let myData = this.dnaData;
  let rand = Math.floor(Math.random() * myData.length);

  for (let i = 0; i < myData.length; i++) {
    if (i < rand) {
      offspring.push(myData[i]);
    }
    else {
      offspring.push(other.dnaData[i])
    }
  }

  return offspring;
}

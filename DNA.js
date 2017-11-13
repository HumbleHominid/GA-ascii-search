module.exports = function(dnaData = []) {
  this.dnaData = dnaData;

  this.toString = toString;
  this.crossover = crossover;

  return this;
}

// Translates the object data to a string
function toString() {
  return this.dnaData.join('');
}

// Combines part of this gene's data with the parameter gene's data
// Returns a new gene
function crossover(other) {
  let offspring = [];
  let myData = this.dnaData;

  for (let i = 0; i < myData.length; i++) {
    if (i < Math.floor(Math.random() * myData.length)) {
      offspring.push(myData[i]);
    }
    else {
      offspring.push(other.dnaData[i])
    }
  }

  return offspring;
}

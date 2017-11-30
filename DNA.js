module.exports = function(dnaData = []) {
  // Bind object data
  this.dnaData = dnaData;
  this.fitness = 0;

  // Bind object methods
  this.toString = toString;
  this.crossover = crossover;

  return this;
}

// Translates the object data to a string
function toString() {
  return this.dnaData.join('');
}

// Combines part of this gene's data with the parameter gene's data
// Returns new genetic data
function crossover(other) {
  let offspring = [];
  let myData = this.dnaData;
  let splitPoint = Math.floor(Math.random() * myData.length);

  for (let i = 0; i < myData.length; i++) {
    offspring.push(i < splitPoint ? myData[i] : other.dnaData[i]);
  }

  return offspring;
}

const DNA = require('./DNA');

module.exports = function(popSize = 100, mutationRate = 0.01, target = []) {
  this.popSize = popSize;
  this.mutationRate = mutationRate;
  this.target = target;
  this.maxFitness = target.length;
  this.population = [];
  this.numGenerations = 0;

  this.populate = populate;
  this.calcFitness = calcFitness;
  this.displayStats = displayStats;
  this.nextGeneration = nextGeneration;

  return this;
}

// Creates a random ascii character
function randChar() {
  return String.fromCharCode(Math.floor(Math.random() * 128));
}

// Populates the population with a random set of ascii strings
//   of the same length as the target
function populate() {
  this.population = [];

  for (let i = 0; i < this.popSize; i++) {
    let dna = [];

    for (let j = 0; j < this.target.length; j++) {
      dna.push(randChar());
    }

    this.population.push(new DNA(dna));
  }
}

// Does a random weighted selection of an individual from a population
//   using the accept/reject algorithm
function selectIndividual() {
  let individual = null

  while (individual === null) {
    selected = this.population[Math.floor(Math.random() *
        this.population.length)];

    if (Math.random() < selected.fitness / this.maxFitness) {
      individual = selected;
    }
  }

  return individual;
}

// Creates the next generation of the population
function nextGeneration() {
  let newPop = [];

  for (let i = 0; i < this.population.length; i++) {
    let parentA = selectIndividual.call(this);
    let parentB = selectIndividual.call(this);

    let geneticData = parentA.crossover(parentB);

    newPop.push(new DNA(mutate.call(this, geneticData)));
  }

  this.population = newPop;
  this.numGenerations++;
}

// Takes an individual and mutates the genes, if necessary
function mutate(geneticData) {
  for (let i = 0; i < geneticData.length; i++) {
    if (Math.random() < this.mutationRate) {
      geneticData[i] = randChar();
    }
  }

  return geneticData;
}

// Calculates the fitness of all the individuals in
//   the population and updates the populations totalFitness,
//   averageFitness, and bestFit
function calcFitness() {
  let target = this.target;
  let totalFitness = 0;

  this.population.forEach((individual) => {
    let fitness = 0;

    for (let i = 0; i < target.length; i++) {
      fitness = fitness + (target[i] == individual.dnaData[i] ? 1 : 0);
    }

    individual.fitness = fitness;
    totalFitness = totalFitness + fitness;
  });

  this.totalFitness = totalFitness;
  this.averageFitness = totalFitness / (this.popSize * target.length);

  // Sorts in descending order
  this.population.sort((a,b) => {
    return b.fitness - a.fitness;
  });

  this.bestFit = this.population[0];
}

// Displays some stats about the population
function displayStats() {
  console.log(`Population Members: ${this.popSize}`);
  console.log(`Generations: ${this.numGenerations}`);
  console.log(`Average Fitness: ${Math.floor(this.averageFitness * 100)}%`);
}

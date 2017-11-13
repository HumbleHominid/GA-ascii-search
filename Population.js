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
  this.selectIndividual = selectIndividual;
  this.mutate = mutate;

  return this;
}

function randChar() {
  return String.fromCharCode(Math.floor(Math.random() * (127 + 1);
}

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

function nextGeneration() {
  let newPop = [];

  for (let i = 0; i < this.population.length; i++) {
    let parentA = this.selectIndividual();
    let parentB = this.selectIndividual();

    let geneticData = parentA.reproduce(parentB);

    newPop.push(new DNA(this.mutate(geneticData)));
  }

  this.population = newPop;
  this.numGenerations++;
}

function mutate(geneticData) {
  for (let i = 0; i < geneticData.length; i++) {
    if (Math.random() < this.mutationRate) {
      geneticData[i] = randChar();
    }
  }

  return geneticData;
}

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

  this.population.sort((a,b) => {
    return b.fitness - a.fitness;
  });

  this.bestFit = this.population[0];
}

function displayStats() {
  console.log(`Population Members: ${this.popSize}`);
  console.log(`Generations: ${this.numGenerations}`);
  console.log(`Average Fitness: ${Math.floor(this.averageFitness * 100)}%`);
}

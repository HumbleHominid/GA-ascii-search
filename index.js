const Population = require('./Population');

var pop = new Population(300, 0.01, "Ai is the best.".split(""));

pop.populate();

pop.calcFitness();

do {
  pop.nextGeneration();

  pop.calcFitness();
} while (pop.bestFit.fitness != pop.maxFitness);

pop.displayStats();

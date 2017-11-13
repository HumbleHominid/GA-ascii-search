const Population = require('./Population');

var popSize = 300;
var mutationRate = 0.01;
var target = "AI is the best!";

var pop = new Population(popSize, mutationRate, target.split(""));

pop.populate();

pop.calcFitness();

var start = process.hrtime();

// Continue to create a new generation until a suitable target is found
while (pop.bestFit.fitness != pop.maxFitness) {
  pop.nextGeneration();

  pop.calcFitness();
}

var end = process.hrtime(start);

pop.displayStats();
// String formatting thing from timing the process
console.log(`Calculation Time: ${end[0] +
    Math.floor(end[1]  / (1000 * 1000)) / 1000}s`);

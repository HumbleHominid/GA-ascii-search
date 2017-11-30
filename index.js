const Population = require('./Population');

// Size of the population to create
var popSize = 1000;

// Mutation rate as a decimal percent, e.g. 0.01 is 1%
var mutationRate = 0.0025;

// Target string the algorithm is trying to match
var target = "GAs are really fun to write!";

var pop = new Population(popSize, mutationRate, target.split(""));

pop.populate();

// Starts a process timer to time the algorithm
var start = process.hrtime();

// Continue to create a new generation until a suitable target is found
//    Guaranteed to happen if `target` consists of all ascii characters
while (pop.calcFitness().fitness != pop.maxFitness) {
  pop.nextGeneration();
}

// Gets algorithm processing time
var end = process.hrtime(start);

pop.displayStats();
// String formatting thing from timing the process
console.log(`Calculation Time: ${end[0] +
    Math.floor(end[1]  / (1000 * 1000)) / 1000}s`);

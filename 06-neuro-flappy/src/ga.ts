import Bird from "./bird";

function nextGeneration(birds: Bird[], saved_birds: Bird[], total: number) {
  console.log('next generation');
  const best_score = saved_birds
    .map(bird => bird.score)
    .reduce((max, cur) => Math.max(max, cur));
  console.log('Best score in generation', best_score);
  calculateFitness(saved_birds);
  for (let i = 0; i < total; i++) {
    birds[i] = pickOne(saved_birds);
  }
  saved_birds.length = 0;
}

function pickOne(birds: Bird[]): Bird {
  let index = 0;
  let r = Math.random();
  while (r > 0) {
    r = r - birds[index].fitness;
    index++;
  }
  index--;
  const bird = birds[index];
  const child = new Bird(bird.sketch, bird.brain);
  child.mutate();
  return child;
}

function calculateFitness(birds: Bird[]) {
  const total = birds
    .map(bird => Math.pow(bird.score, 4))
    .reduce((sum, cur) => (sum + cur));
  birds.map(bird => bird.fitness = Math.pow(bird.score, 4) / total);
}

export { nextGeneration, calculateFitness };

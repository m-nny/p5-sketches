import * as p5 from 'p5'
import Bird from './bird'
import Pipe from './pipe'
import { nextGeneration } from './ga';

const TOTAL = 500;

const myp5 = new p5((sketch: p5) => {
  let birds: Bird[] = [];
  let saved_birds: Bird[] = [];
  let pipes: Pipe[] = [];
  let counter = 0;
  let speed_slider: p5.Element;

  sketch.setup = () => {
    sketch.createCanvas(400, 600);
    for (let i = 0; i < TOTAL; i++) {
      birds[i] = new Bird(sketch);
    }
    speed_slider = sketch.createSlider(1, 100, 1);
    // sketch.frameRate(10);

    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.textSize(32);
  }

  sketch.draw = () => {
    sketch.background(0);

    const speed = speed_slider.value() as number;
    for (let step = 0; step < speed; step++) {
      if (counter <= 0) {
        pipes.push(new Pipe(sketch));
        counter = Math.floor(sketch.random(90, 100));
      }
      counter--;

      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();

        for (let j = birds.length - 1; j >= 0; j--) {
          if (pipes[i].hits(birds[j])) {
            saved_birds.push(birds.splice(j, 1)[0]);
          }
        }

        if (pipes[i].offscreen()) {
          pipes.splice(i, 1);
        }
      }

      for (let j = birds.length - 1; j >= 0; j--) {
        if (birds[j].offscreen()) {
          saved_birds.push(birds.splice(j, 1)[0]);
        }
      }

      birds.map(bird => {
        bird.think(pipes);
        bird.update();
      });

      if (birds.length === 0) {
        counter = 0;
        nextGeneration(birds, saved_birds, TOTAL);
        pipes = [];
      }
    }

    birds.map(bird => bird.show());
    pipes.map(pipe => pipe.show());

    sketch.fill(195, 66, 63);
    sketch.text('Score ' + birds[0].score,
      sketch.width / 2, 80);
    sketch.text('Population ' + birds.length,
      sketch.width / 2, 120);

  }
});

import * as p5 from 'p5'
import { NeuralNetwork } from 'toy-net'
import Pipe from './pipe';

class Bird {
  x = 64;
  y = this.sketch.height / 2;
  r = 16;
  gravity = 0.6;
  lift = -16;
  velocity = 0;
  score = 0;
  fitness = 0;
  brain: NeuralNetwork;

  constructor(sketch: p5);
  constructor(sketch: p5, brain: NeuralNetwork);
  constructor(public sketch: p5, brain?: NeuralNetwork) {
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }

  show() {
    this.sketch.fill(255, 64);
    this.sketch.ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  update() {
    this.score++;

    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.sketch.height < this.y + this.r) {
      this.y = this.sketch.height - this.r;
      this.velocity = 0;
    }
    if (this.y - this.r < 0) {
      this.y = this.r;
      this.velocity = 0;
    }
  }

  up() {
    this.velocity += this.lift;
  }

  mutate() {
    this.brain.mutate(.1);
  }

  think(pipes: Pipe[]) {
    let closest: Pipe = null;
    let closestD = Infinity;
    pipes.map(pipe => {
      const d = pipe.x - this.x;
      if (0 < d && d < closestD) {
        closest = pipe;
        closestD = d;
      }
    });

    const inputs = [];
    inputs[0] = this.y / this.sketch.height;
    inputs[1] = closest ? closest.top / this.sketch.height : 0;
    inputs[2] = closest ? closest.bottom / this.sketch.height : 1.5;
    inputs[3] = closest ? closest.x / this.sketch.width : 1.5;
    inputs[4] = this.velocity / 20;
    const output = this.brain.feedforward(inputs);
    if (output[0] > output[1]) {
      this.up();
    }
  }

  offscreen() {
    // console.log(this.y);
    return this.y - this.r <= 0 || this.sketch.height <= this.y + this.r;
  }
}

export default Bird;

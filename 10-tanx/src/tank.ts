import * as p5 from 'p5';
import Mover from './mover';

const height = 40;
const width = 80;

class Tank extends Mover {
  constructor(private sketch: p5, x: number, y: number) {
    super(
      sketch.createVector(x, y),
      sketch.createVector(0, 0),
      sketch.createVector(0, 0),
      height, width,
      20.0);
  }
  update() {
    super.update();
  }
  draw() {
    this.sketch.fill(128);
    this.sketch.rect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
  }
}

export default Tank;
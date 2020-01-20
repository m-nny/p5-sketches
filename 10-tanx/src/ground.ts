import * as p5 from 'p5';
import Mover from './mover';

class Ground {
  constructor(private sketch: p5, public height: number) {
  }
  draw() {
    this.sketch.fill(0);
    this.sketch.noStroke();
    this.sketch.rect(0, this.height, this.sketch.width, this.sketch.height);
  }
  hits(m: Mover) {
    if (m.position.y > (this.height - m.height / 2)) {
      m.velocity.y *= -0.3;
      m.position.y = this.height - m.height / 2;
    }
  }
}

export default Ground;
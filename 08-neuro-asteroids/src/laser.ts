import * as p5 from 'p5';
import Asteroid from './asteroid';

class Laser {
  private pos: p5.Vector;
  private velocity: p5.Vector;

  constructor(private sketch: p5, shipPos: p5.Vector, angle: number) {
    this.pos = this.sketch.createVector(shipPos.x, shipPos.y);
    this.velocity = p5.Vector.fromAngle(angle);
    this.velocity.mult(10);
  }

  update() {
    this.pos.add(this.velocity);
  }

  show() {
    this.sketch.push();
    this.sketch.stroke(255);
    this.sketch.strokeWeight(4);
    this.sketch.point(this.pos.x, this.pos.y);
    this.sketch.pop();
  }

  hits(asteroid: Asteroid) {
    let d = this.sketch.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < asteroid.r;
  }

  offscreen() {
    const { width, height } = this.sketch;
    if (width < this.pos.x || this.pos.x < 0) {
      return true;
    }
    if (height < this.pos.y || this.pos.y < 0) {
      return true;
    }
    return false;
  }
}

export default Laser;

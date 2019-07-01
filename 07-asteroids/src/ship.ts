import * as p5 from 'p5';
import Asteroid from './asteroid';

class Ship {
  pos = this.sketch.createVector(this.sketch.width / 2, this.sketch.height / 2);
  private velocity = this.sketch.createVector(0, 0);
  private isBoosting = false;
  heading = 0;
  private r = 15;
  private rotation = 0;

  constructor(private sketch: p5) { }
  show() {
		const {PI} = this.sketch;
    this.sketch.push();
    this.sketch.translate(this.pos.x, this.pos.y);
    this.sketch.rotate(this.heading + PI / 2);
    this.sketch.fill(0);
    this.sketch.stroke(255);
    this.sketch.triangle(-this.r, this.r, this.r, this.r, 0, 1.5 * -this.r);
    this.sketch.point(0, 0);
    this.sketch.pop();
  }

  update() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.velocity);
    this.velocity.mult(0.99);
  }

  setRotation(value: number) {
    this.rotation = value;
  }

  boosting(flag: boolean) {
    this.isBoosting = flag;
  }

  boost() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(.1);
    this.velocity.add(force);
  }

  turn() {
    this.heading += this.rotation;
  }

  edges() {
		const {height, width} = this.sketch;
    if (width + this.r < this.pos.x) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (height + this.r < this.pos.y) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  hits(asteroid: Asteroid) {
    let d = this.sketch.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return (d < this.r + asteroid.r);
  }
}

export default Ship;

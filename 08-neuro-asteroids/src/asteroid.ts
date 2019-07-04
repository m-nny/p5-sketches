import * as p5 from 'p5';
import Obstacle from './Obstacle';

class Asteroid extends Obstacle {
  private velocity = p5.Vector.random2D();
  private total = this.sketch.random(5, 15);
  private offset: number[] = [];

  constructor(sketch: p5)
  constructor(sketch: p5, pos: p5.Vector, r: number)
  constructor(private sketch: p5, pos?: p5.Vector, r?: number) {
    super(sketch.createVector(
      sketch.random(sketch.width),
      sketch.random(sketch.height)),
      sketch.random(15, 50));
    if (pos) {
      this.pos = pos.copy();
    }
    if (r) {
      this.r = r * .5;
    }
    for (let i = 0; i < this.total; i++) {
      this.offset.push(0);
      // this.offset.push(this.sketch.random(-this.r * .5, this.r * .5));
    }
  }

  update() {
    this.pos.add(this.velocity);
  }

  show() {
    const { map, PI, CLOSE } = this.sketch;
    this.sketch.push();
    this.sketch.stroke(255);
    this.sketch.noFill();
    this.sketch.translate(this.pos.x, this.pos.y);
    // ellipse(0, 0, this.r * 2);
    this.sketch.beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, 2 * PI);
      let r = this.offset[i] + this.r;
      let x = r * this.sketch.cos(angle);
      let y = r * this.sketch.sin(angle);
      this.sketch.vertex(x, y);
    }
    this.sketch.endShape(CLOSE);
    this.sketch.pop();
  }

  edges() {
    const { width, height } = this.sketch;
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

  breakup(): [Asteroid, Asteroid] {
    let newA = new Asteroid(this.sketch, this.pos, this.r);
    let newB = new Asteroid(this.sketch, this.pos, this.r);
    return [newA, newB];
  }
}

export default Asteroid;

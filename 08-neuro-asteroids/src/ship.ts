import * as p5 from 'p5';
import Obstacle from './Obstacle';

class Ship extends Obstacle {
  private velocity = this.sketch.createVector(0, 0);
  private isBoosting = false;
  heading = 0;
  private rotation = 0;
  private readonly rotationSpeed = .1;

  constructor(private sketch: p5) {
    super(sketch.createVector(sketch.width / 2, sketch.height / 2), 15);
  }

  show() {
    const { PI } = this.sketch;
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
    this.heading += this.rotation; // turn ship

    this.pos.add(this.velocity); // move ship
    this.velocity.mult(0.99);
  }

  public turnLeft() {
    this.rotation = -this.rotationSpeed;
  }

  public turnRight() {
    this.rotation = +this.rotationSpeed;
  }

  public turnStraight() {
    this.rotation = 0;
  }

  boosting(flag: boolean) {
    this.isBoosting = flag;
  }

  private boost() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(.1);
    this.velocity.add(force);
  }

  edges() {
    const { height, width } = this.sketch;
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
}

export default Ship;

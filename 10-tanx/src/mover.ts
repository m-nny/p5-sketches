import * as p5 from 'p5';

class Mover {
  constructor(
    public position: p5.Vector,
    public velocity: p5.Vector,
    public acceleration: p5.Vector,
    public height: number,
    public width: number,
    public mass: number = 1,
    public dumpFactor: number = 0,
  ) { }
  applyForce(force: p5.Vector) {
    const a = p5.Vector.div(force, this.mass);
    this.acceleration.add(a);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}

export default Mover;
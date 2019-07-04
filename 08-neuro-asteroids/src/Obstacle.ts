import * as p5 from 'p5';

class Obstacle {
  constructor(public pos: p5.Vector, public r = 1) { }

  hits(other: Obstacle) {
    let d = this.pos.dist(other.pos);
    return (d < this.r + other.r);
  }
}

export default Obstacle;

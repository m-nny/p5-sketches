import * as p5 from 'p5'
import Bird from './bird'

class Pipe {
  spacing = 180; // this.sketch.random(120, 240);
  top = this.sketch.random(this.sketch.height / 6, 3 / 4 * this.sketch.height);
  bottom = this.sketch.height - (this.top + this.spacing);
  x = this.sketch.width;
  width = 80;
  speed = 6;
  hightlight = false;

  constructor(public sketch: p5) { }
  show() {
    this.sketch.fill(255);
    if (this.hightlight) {
      this.sketch.fill(255, 0, 0);
    }
    this.sketch.rectMode(this.sketch.CORNER);
    this.sketch.rect(this.x, 0, this.width, this.top);
    this.sketch.rect(this.x, this.sketch.height - this.bottom, this.width, this.bottom);
  }
  update() {
    this.x -= this.speed;
  }
  offscreen() {
    return this.x < -this.width;
  }
  hits(bird: Bird) {
    if (bird.y - bird.r < this.top || this.sketch.height - this.bottom < bird.y + bird.r) {
      if (this.x < bird.x + bird.r && bird.x - bird.r < this.x + this.width) {
        this.hightlight = true;
        return true;
      }
    }
    this.hightlight = false;
    return false;
  }
}

export default Pipe;

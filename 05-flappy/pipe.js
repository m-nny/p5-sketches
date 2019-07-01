class Pipe {
  constructor() {
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    this.x = width;
    this.width = 35;
    this.speed = 2;

    this.hightlight = false;
  }
  show() {
    fill(255);
    if (this.hightlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.width, this.top);
    rect(this.x, height - this.bottom, this.width, this.bottom);
  }
  update() {
    this.x -= this.speed;
  }
  offscreen() {
    return this.x < -this.width;
  }
  hits(bird) {
    if (bird.y - bird.r < this.top || height - this.bottom < bird.y + bird.r) {
      if (this.x < bird.x + bird.r && bird.x - bird.r < this.x + this.width) {
        this.hightlight = true;
        return true;
      }
    }
    this.hightlight = false;
    return false;
  }
}

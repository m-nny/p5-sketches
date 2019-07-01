class Bird {
  constructor() {
    this.x = 64;
    this.y = height / 2;
    this.r = 16;

    this.gravity = 0.6;
    this.lift = -13;
    this.velocity = 0;
  }
  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
  update() {
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.velocity *= 0.9;

    if (height < this.y + this.r) {
      this.y = height - this.r;
      this.velocity = 0;
    }
    if (this.y - this.r < 0) {
      this.y = this.r;
      this.velocity = 0;
    }
  }
  up() {
    this.velocity += this.lift;
  }
}

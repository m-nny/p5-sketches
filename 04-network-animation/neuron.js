class Neuron {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.connections = [];

    this.sum = 0;

    this.r = 32;
  }
  addConnection(c) {
    this.connections.push(c);
  }
  feedforward(input) {
    this.sum += input;
    if (this.sum > 1) {
      this.fire();
      this.sum = 0;
    }
  }
  fire() {
    this.r = 64;
    this.connections.map(c => c.feedforward(this.sum));
  }
  show() {
    stroke(0);
    strokeWeight(1);
    let b = map(this.sum, 0, 1, 0, 255);
    b += map(this.r, 32, 64, 0, 500);
    fill(b);
    ellipse(this.position.x, this.position.y, this.r, this.r);

    this.r = lerp(this.r, 32, 0.1);

    // this.connections.map(c => c.show());
  }
}

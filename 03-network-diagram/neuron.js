class Neuron {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.connections = [];
  }
  show() {
    stroke(0);
    fill(0);
    ellipse(this.position.x, this.position.y, 16, 16);

    this.connections.map(c => c.show());
  }
  addConnection(c) {
    this.connections.push(c);
  }
}

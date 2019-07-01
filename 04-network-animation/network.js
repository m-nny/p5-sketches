class Network {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.neurons = [];
    this.connections = [];
  }
  addNeuron(n) {
    this.neurons.push(n);
  }
  connect(a, b) {
    let c = new Connection(a, b, random(1));
    a.addConnection(c);
    this.connections.push(c);
  }
  feedforward(input) {
    let start = this.neurons[0];
    start.feedforward(input);
  }
  update() {
    this.connections.map(c => c.update());
  }
  show() {
    push();
    translate(this.position.x, this.position.y);
    this.neurons.map(n => n.show());
    this.connections.map(c => c.show());
    pop();
  }
}

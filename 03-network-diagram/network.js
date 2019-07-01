class Network {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.neurons = [];
  }
  addNeuron(n) {
    this.neurons.push(n);
  }
  show() {
    push();
    translate(this.position.x, this.position.y);
    this.neurons.map(n => n.show());
    pop();
  }
  connect(a, b) {
    let c = new Connection(a, b, random(1));
    a.addConnection(c)
  }
}

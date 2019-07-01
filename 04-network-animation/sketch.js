let network;

function setup() {
  createCanvas(640, 360);
  network = new Network(width / 2, height / 2);

  let a = new Neuron(-200, 0);
  let b = new Neuron(0, 100);
  let c = new Neuron(0, -100);
  let d = new Neuron(200, 0);

  network.connect(a, b);
  network.connect(a, c);
  network.connect(b, d);
  network.connect(c, d);

  network.addNeuron(a);
  network.addNeuron(b);
  network.addNeuron(c);
  network.addNeuron(d);

  network.feedforward(random(1));
}

function draw() {
  background(255);
  network.update();
  network.show();

  if (frameCount % 30 == 0) {
    network.feedforward(random(1));
  }
}

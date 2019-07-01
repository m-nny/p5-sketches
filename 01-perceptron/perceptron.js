class Perceptron {
  constructor(n, c) {
    this.weights = new Array(n);
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(-1, 1);
    }
    this.c = c;
  }

  feedforward(inputs) {
    var sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += this.weights[i] * inputs[i];
    }
    return this.activate(sum);
  }

  train(inputs, desired) {
    var guess = this.feedforward(inputs);
    var error = desired - guess;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += this.c * error * inputs[i];
    }
  }

  activate(sum) {
    if (sum > 0) return 1;
    else return -1;
  }

  getWeights() {
    return this.weights;
  }
}

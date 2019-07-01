class Connection {
  constructor(from, to, w) {
    this.weight = w;
    this.a = from;
    this.b = to;
  }
  show() {
    stroke(0);
    strokeWeight(this.weight * 4);
    line(
      this.a.position.x, this.a.position.y,
      this.b.position.x, this.b.position.y
    )
  }
}

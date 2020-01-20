import * as p5 from 'p5';
import Ground from './ground';
import Tank from './tank';

const canvas = new p5((sketch: p5) => {
  const ground = new Ground(sketch, 400);
  const tanx = new Tank(sketch, 200, 200);
  const G = sketch.createVector(0, 9.8);
  sketch.setup = () => {
    sketch.createCanvas(800, 600);
  }

  sketch.draw = () => {
    tanx.applyForce(G);
    ground.hits(tanx);

    tanx.update();

    sketch.background(222);
    ground.draw();
    tanx.draw();
  }

  sketch.keyPressed = () => {
    if (sketch.keyCode === sketch.LEFT_ARROW) {
      tanx.applyForce(sketch.createVector(10, 0))
    }
  }
});

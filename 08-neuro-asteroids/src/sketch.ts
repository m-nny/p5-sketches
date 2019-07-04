import * as p5 from 'p5';
import Population from './population';

const canvas = new p5((sketch: p5) => {
  let population: Population;
  sketch.setup = function() {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.textSize(32);
    population = new Population(sketch, 20);

  }

  sketch.draw = function() {
    sketch.background(100);
    population.update();
    population.show(true);
  }
  //
  // sketch.keyPressed = function() {
  //   const { key, keyCode } = sketch;
  //   if (populaton.over || populaton.bot) {
  //     return
  //   }
  //   if (key == ' ') {
  //     // Space
  //     populaton.shoot();
  //   } else if (keyCode == 37) {
  //     // ArrowRight
  //     game.ship.turnLeft();
  //   } else if (keyCode == 38) {
  //     // ArrowUp
  //     game.ship.boosting(true);
  //   } else if (keyCode == 39) {
  //     // ArrowRight
  //     game.ship.turnRight();
  //   }
  // }
  //
  // sketch.keyReleased = function() {
  //   if (game.over || game.bot) {
  //     return
  //   }
  //   const { keyCode } = sketch;
  //   if (keyCode == 37 || keyCode == 39) {
  //     game.ship.turnStraight();
  //   } else if (keyCode == 38) {
  //     game.ship.boosting(false);
  //   }
  // }

});

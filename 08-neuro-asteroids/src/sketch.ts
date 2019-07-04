import * as p5 from 'p5';

import Game from './game';

const canvas = new p5((sketch: p5) => {
  let game: Game;
  sketch.setup = function() {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.textSize(32);

    game = new Game(sketch);
  }

  sketch.draw = function() {
    game.update();
    game.show();
  }

  sketch.keyPressed = function() {
    const { key, keyCode } = sketch;
    if (game.over) {
      return
    }
    if (key == ' ') {
      // Space
      game.shoot();
    } else if (keyCode == 37) {
      // ArrowRight
      game.ship.turnLeft();
    } else if (keyCode == 38) {
      // ArrowUp
      game.ship.boosting(true);
    } else if (keyCode == 39) {
      // ArrowRight
      game.ship.turnRight();
    }
  }

  sketch.keyReleased = function() {
    if (game.over) {
      return
    }
    const { keyCode } = sketch;
    if (keyCode == 37 || keyCode == 39) {
      game.ship.turnStraight();
    } else if (keyCode == 38) {
      game.ship.boosting(false);
    }
  }

});

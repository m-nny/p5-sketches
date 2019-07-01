import * as p5 from 'p5';

import Ship from './ship';
import Asteroid from './asteroid';
import Laser from './laser';

const canvas = new p5((sketch) => {
  let ship: Ship;
  let asteroids: Asteroid[] = [];
  let lasers: Laser[] = [];

  sketch.setup = function() {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    ship = new Ship(sketch);
    for (let i = 0; i < 5; i++) {
      asteroids.push(new Asteroid(sketch));
    }
  }

  sketch.draw = function() {
    sketch.background(100);

    asteroids.map(asteroid => {
      if (ship.hits(asteroid)) {
        console.log('game over');
      }
      asteroid.show();
      asteroid.update();
      asteroid.edges();
    });

    for (let i = lasers.length - 1; i >= 0; i--) {
      lasers[i].update();
      lasers[i].show();

      if (lasers[i].offscreen()) {
        lasers.splice(i, 1);
        continue;
      }

      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 15) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }

    ship.show();
    ship.turn();
    ship.update();
    ship.edges();

  }

  sketch.keyPressed = function() {
    const { key, keyCode } = sketch;
    if (key == ' ') {
      // Space
      lasers.push(new Laser(sketch, ship.pos, ship.heading));
    } else if (keyCode == 37) {
      // ArrowRight
      ship.setRotation(-.1);
    } else if (keyCode == 38) {
      // ArrowUp
      ship.boosting(true);
    } else if (keyCode == 39) {
      // ArrowRight
      ship.setRotation(.1);
    }
  }

  sketch.keyReleased = function() {
    const { keyCode } = sketch;
    if (keyCode == 37 || keyCode == 39) {
      ship.setRotation(0);
    } else if (keyCode == 38) {
      ship.boosting(false);
    }
  }
});

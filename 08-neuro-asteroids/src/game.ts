import * as p5 from 'p5'

import Ship from './ship'
import Asteroid from './asteroid'
import Laser from './laser'

class Game {
  ship = new Ship(this.sketch);
  asteroids: Asteroid[] = [];
  lasers: Laser[] = [];
  score = 0;
  alive = true;
  asteroidTimer = 0;
  get over() { return !this.alive }

  constructor(sketch: p5)
  constructor(sketch: p5, n_asteroids: number)
  constructor(private sketch: p5, n_asteroids = 8) {
    for (let i = 0; i < n_asteroids; i++) {
      this.spawnAsteriod();
    }
  }

  shoot() {
    this.lasers.push(new Laser(this.sketch, this.ship.pos, this.ship.heading));
  }

  spawnAsteriod() {
    this.asteroids.push(new Asteroid(this.sketch));
    this.asteroidTimer = Math.floor(this.sketch.random(900, 1000));
    // console.log('New Asteroid', this.asteroidTimer);
  }

  update() {
    if (this.alive) {
      this.score++;
    }

    this.asteroidTimer--;
    if (this.asteroidTimer <= 0) {
      this.spawnAsteriod();
    }

    this.asteroids.map(asteroid => asteroid.update());
    this.lasers.map(laser => laser.update());
    this.ship.update();

    this.offsreen();
    if (this.alive) {
      this.collision();
    }
  }

  private offsreen() {
    this.asteroids.map(asteroid => asteroid.edges());
    this.ship.edges();

    for (let i = this.lasers.length - 1; i >= 0; i--) {
      if (this.lasers[i].offscreen()) {
        this.lasers.splice(i, 1);
        continue;
      }
    }
  }

  private collision() {
    if (this.asteroids.some(asteroid => this.ship.hits(asteroid))) {
      this.endgame();
    }

    for (let i = this.lasers.length - 1; i >= 0; i--) {
      for (var j = this.asteroids.length - 1; j >= 0; j--) {
        if (this.lasers[i].hits(this.asteroids[j])) {
          if (this.asteroids[j].r > 15) {
            var newAsteroids = this.asteroids[j].breakup();
            this.asteroids = this.asteroids.concat(newAsteroids);
          }
          this.asteroids.splice(j, 1);
          this.lasers.splice(i, 1);
          break;
        }
      }
    }

  }

  private endgame() {
    console.log('Gameover');
    this.alive = false;
    this.ship.boosting(false);
    this.ship.turnStraight();
  }

  show() {
    this.sketch.background(100);

    this.asteroids.map(asteroid => asteroid.show());
    this.lasers.map(laser => laser.show());

    this.ship.show();

    this.sketch.fill(255);
    this.sketch.text('Score ' + this.score, this.sketch.width / 2, 80);
    this.sketch.text('Lasers ' + this.lasers.length, this.sketch.width / 2, 120);
  }
}

export default Game;

import * as p5 from 'p5'
import { NeuralNetwork } from 'toy-net';

import Ship from './ship'
import Asteroid from './asteroid'
import Laser from './laser'
import Obstacle from './Obstacle';

class Game {
  ship = new Ship(this.sketch);
  asteroids: Asteroid[] = [];
  lasers: Laser[] = [];
  score = 0;
  alive = true;
  asteroidTimer = 0;
  shootTimer = 0;
  private n_inputs = 8;
  private n_hidden = 4;
  private n_output = 4;
  private action_threshold = .80;
  private brain = new NeuralNetwork(this.n_inputs, this.n_hidden, this.n_output);
  get over() { return !this.alive }

  constructor(sketch: p5)
  constructor(sketch: p5, bot: boolean)
  constructor(sketch: p5, bot: boolean, n_asteroids: number)
  constructor(private sketch: p5, public bot = true, n_asteroids = 8) {
    for (let i = 0; i < n_asteroids; i++) {
      this.spawnAsteriod();
    }
  }

  shoot() {
    if (this.shootTimer <= 0) {
      this.lasers.push(new Laser(this.sketch, this.ship.pos, this.ship.heading));
      this.shootTimer = 30;
    }
  }

  spawnAsteriod() {
    this.asteroids.push(new Asteroid(this.sketch));
    this.asteroidTimer = Math.floor(this.sketch.random(900, 1000));
    // console.log('New Asteroid', this.asteroidTimer);
  }

  update() {
    if (this.bot) {
      this.think();
    }

    if (this.alive) {
      this.score++;
    }

    this.timers();

    this.asteroids.map(asteroid => asteroid.update());
    this.lasers.map(laser => laser.update());
    this.ship.update();

    this.offsreen();
    if (this.alive) {
      this.collision();
    }
  }

  timers() {
    this.asteroidTimer--;
    if (this.asteroidTimer <= 0) {
      this.spawnAsteriod();
    }

    this.shootTimer--;
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

  private think() {
    const inputs = this.lookAround();
    const outputs = this.brain.feedforward(inputs);
    // console.log(outputs);

    // Boost
    if (outputs[0] > this.action_threshold) {
      this.ship.boosting(true);
    } else {
      this.ship.boosting(false);
    }

    // Turn left or right
    if (outputs[1] > this.action_threshold) {
      this.ship.turnLeft();
    } else if (outputs[2] > this.action_threshold) {
      this.ship.turnRight();
    } else {
      this.ship.turnStraight();
    }

    // Shoot
    if (outputs[3] > this.action_threshold) {
      this.shoot();
    }
  }

  private drawLookAround() {
    const lookAround = this.lookAround();
    for (let i = 0; i < this.n_inputs; i++) {
      const angle = this.ship.heading + this.sketch.map(i, 0, this.n_inputs, 0, this.sketch.PI * 2);
      const direction = p5.Vector.fromAngle(this.ship.heading + angle);
      const d = lookAround[i].toFixed(3);
      direction.mult(600);
      this.sketch.line(this.ship.pos.x, this.ship.pos.y,
        this.ship.pos.x + direction.x, this.ship.pos.y + direction.y);
      // this.sketch.text(`lookaround ${i} ${d}`, this.sketch.width / 2, 160 + i * 40);
    }
  }

  private lookAround(): number[] {
    const d = [];
    for (let i = 0; i < this.n_inputs; i++) {
      const angle = this.ship.heading + this.sketch.map(i, 0, this.n_inputs, 0, this.sketch.PI * 2);
      const direction = p5.Vector.fromAngle(this.ship.heading + angle);
      direction.mult(10);

      d[i] = this.lookInDirection(direction);
    }
    return d;
  }

  /// Returns inverse of distance to closest asteroid in particular direction
  /// 0, if there is no obstacles until some threshold
  private lookInDirection(direction: p5.Vector, threshold = 60): number {
    let d = 0;
    let checkpoint = new Obstacle(this.ship.pos.copy());

    do {
      checkpoint.pos.add(direction);
      d += 1;
      if (this.asteroids.some(asteroid => asteroid.hits(checkpoint))) {
        return 1 / d;
      }
    } while (d < threshold);
    return 0;
  }

  show() {
    // this.sketch.background(100);

    this.asteroids.map(asteroid => asteroid.show());
    this.lasers.map(laser => laser.show());

    this.ship.show();

    // this.sketch.text('Lasers ' + this.lasers.length, this.sketch.width / 2, 120);

    this.drawLookAround();
  }

}

export default Game;

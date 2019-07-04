import * as p5 from 'p5';
import Game from "./game";

class Population {
  private games: Game[] = [];
  private finished_games: Game[] = [];
  private bestScore = 0;
  constructor(private sketch: p5, private size: number) {
    for (let i = 0; i < size; i++) {
      this.games[i] = new Game(sketch, true);
    }
  }

  update() {
    for (let i = this.games.length - 1; i >= 0; i--) {
      const game = this.games[i];
      game.update();
      if (game.over) {
        this.finished_games.concat(this.games.splice(i, 1));
        continue;
      }
    };
  }

  show(onlyBest = true) {
    if (onlyBest) {
      if (this.games.length > 0) {
        this.games[0].show();
      } else {
        this.finished_games[this.finished_games.length - 1].show();
      }
    } else {
      this.games.map(game => game.show());
    }
    this.sketch.fill(255);
    this.sketch.text('Score ' + this.bestScore, this.sketch.width / 2, 80);
    this.sketch.text('Population ' + this.games.length, this.sketch.width / 2, 120);
    this.sketch.text('fps ' + this.sketch.frameRate().toFixed(2), this.sketch.width / 2, 40);
  }

  nextGeneration() {

  }
}

export default Population;

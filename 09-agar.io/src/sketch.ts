import * as p5 from 'p5';

import Blob from './blob';

const canvas = new p5((sketch: p5) => {
  let player: Blob;
  let blobs: Blob[] = [];
  let zoom = 1;

  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
    player = new Blob(sketch, 0, 0, 64);
    blobs = Array(50).fill(null).map(_ => {
      const x = sketch.random(-sketch.width, sketch.width);
      const y = sketch.random(-sketch.height, sketch.height);
      return new Blob(sketch, x, y, 16);
    });
  }

  sketch.draw = () => {
    sketch.background(100);

    sketch.translate(sketch.width / 2, sketch.height / 2);
    var newZoom = 64 / player.r;
    zoom = sketch.lerp(zoom, newZoom, .1);
    sketch.scale(zoom);
    sketch.translate(-player.pos.x, -player.pos.y);

    player.update();
    blobs = blobs.filter(b => !player.eats(b));

    player.show();
    blobs.map(b => b.show());
  }
});

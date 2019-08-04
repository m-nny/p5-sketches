import * as p5 from 'p5';

class Blob {
    pos: p5.Vector;
    vel = this.sketch.createVector(0, 0);

    constructor(private sketch: p5, x: number, y: number, public r: number) {
        this.pos = sketch.createVector(x, y);
    }

    eats(other: Blob): boolean {
        const d = p5.Vector.dist(this.pos, other.pos);
        if (d <= this.r + other.r) {
            const new_r = this.r * this.r + other.r * other.r;
            this.r = Math.sqrt(new_r);
            return true;
        }
        return false;
    }

    update() {
        const newVel = this.sketch.createVector(this.sketch.mouseX - this.sketch.width / 2, this.sketch.mouseY - this.sketch.height / 2);
        newVel.setMag(3);

        this.vel.lerp(newVel, 0.1);

        this.pos.add(this.vel);
    }

    show() {
        this.sketch.fill(255);
        this.sketch.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
};

export default Blob;
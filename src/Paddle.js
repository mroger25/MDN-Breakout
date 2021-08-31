const drawPaddle = (ctx, { x, y }, { w, h }) => {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const sum = (a, b) => {
  return { x: a.x + b.x, y: a.y + b.y };
};

export class Paddle {
  constructor(pong) {
    this.court = { w: pong.canvas.width, h: pong.canvas.height };
    this.dim = { w: 75, h: 10 };
    this.pos = { x: (this.court.w - this.dim.w) / 2, y: this.court.h - 30 };
    this.vel = { x: 0, y: 0 };
  }

  move(e) {
    const acceptedKey = {
      ArrowRight: () => {
        this.vel.x = 7;
      },
      ArrowLeft: () => {
        this.vel.x = -7;
      },
    };
    if (acceptedKey[e]) {
      acceptedKey[e]();
    }
  }

  stop(e) {
    const acceptedKey = {
      ArrowRight: () => {
        this.vel.x = 0;
      },
      ArrowLeft: () => {
        this.vel.x = 0;
      },
    };
    if (acceptedKey[e]) {
      acceptedKey[e]();
    }
  }

  update() {
    // Moving paddle
    this.pos = sum(this.pos, this.vel);
    // Restricting paddle to walls
    if (this.pos.x + this.dim.w > this.court.w) {
      this.pos.x = this.court.w - this.dim.w;
    } else if (this.pos.x < 0) {
      this.pos.x = 0;
    }
  }
  draw(ctx) {
    // Drawing paddle on canvas
    drawPaddle(ctx, this.pos, this.dim);
  }
}

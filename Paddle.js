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
  constructor({ w, h }) {
    this.events = {};
    this.court = { w, h };
    this.dim = { w: 75, h: 10 };
    this.pos = { x: (w - this.dim.w) / 2, y: h - 30 };
    this.vel = { x: 0, y: 0 };
  }

  emit(e, t) {
    const i = this.events[e];
    if (i) {
      i.forEach((e) => {
        e(t);
      });
    }
  }

  on(e, t) {
    if (this.events[e]) {
      this.events[e].push(t);
    } else {
      this.events[e] = [];
      this.events[e].push(t);
    }
  }

  mouseMove(e) {
    const relativeX = e.x;
    this.pos.x = relativeX - this.dim.w / 2;
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

  update(ctx) {
    // Drawing paddle on canvas
    drawPaddle(ctx, this.pos, this.dim);
    // Moving paddle
    this.pos = sum(this.pos, this.vel);
    // Restricting paddle to walls
    if (this.pos.x + this.dim.w > this.court.w) {
      this.pos.x = this.court.w - this.dim.w;
    } else if (this.pos.x < 0) {
      this.pos.x = 0;
    }
    // Checking for collision
    const n = { pos: this.pos, dim: this.dim };
    this.emit("ckeckCollision", n);
  }
}

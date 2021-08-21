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
    this.court = { w, h };
    this.dim = { w: 75, h: 10 };
    this.pos = { x: (w - this.dim.w) / 2, y: h - 30 };
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

  update(ctx, ball) {
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
    const tpadd = this.pos.y;
    const lpadd = this.pos.x;
    const rpadd = this.pos.x + this.dim.w;
    const bball = ball.pos.y + ball.r;
    const lball = ball.pos.x - ball.r;
    const rball = ball.pos.x + ball.r;
    if (bball < tpadd) {
    } else if (ball.pos.x > lpadd && ball.pos.x < rpadd) {
      ball.vel.y *= -1;
    } else if (rball < lpadd || lball > rpadd) {
    } else {
      const test = { x: ball.pos.x, y: ball.pos.y };
      if (ball.pos.x < this.pos.x) test.x = this.pos.x;
      else if (ball.pos.x - ball.r > this.dim.w)
        test.x = this.pos.x + this.dim.w;
      if (ball.pos.y < this.pos.y) test.y = this.pos.y;
      else if (ball.pos.y - ball.r > this.dim.h)
        test.y = this.pos.y + this.dim.h;
      const dx = ball.pos.x - test.x;
      const dy = ball.pos.y - test.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= ball.r) ball.vel.x *= -1;
    }
  }
}

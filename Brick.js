const drawBricks = (ctx, { x, y }, { w, h }) => {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

export class Brick {
  constructor({ w, h }) {
    this.court = { w, h };
    this.rows = 3;
    this.cols = 5;
    this.dim = { w: 75, h: 20 };
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.init();
  }

  init() {
    this.grid = [];
    for (let c = 0; c < this.cols; c++) {
      this.grid[c] = [];
      for (let r = 0; r < this.rows; r++) {
        this.grid[c][r] = {
          x: c * (this.dim.w + this.padding) + this.offsetLeft,
          y: r * (this.dim.h + this.padding) + this.offsetTop,
          status: !0,
        };
      }
    }
  }

  update(ctx, ball) {
    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        const brick = this.grid[c][r];
        if (brick.status) {
          drawBricks(ctx, brick, this.dim);
          // Checking for collision
          const tbrck = brick.y;
          const bbrck = brick.y + this.dim.h;
          const lbrck = brick.x;
          const rbrck = brick.x + this.dim.w;
          const tball = ball.pos.y - ball.r;
          const bball = ball.pos.y + ball.r;
          const lball = ball.pos.x - ball.r;
          const rball = ball.pos.x + ball.r;
          if (bball < tbrck || tball > bbrck) {
          } else if (ball.pos.x > lbrck && ball.pos.x < rbrck) {
            ball.vel.y *= -1;
            brick.status = !1;
          } else if (rball < lbrck || lball > rbrck) {
          } else {
            const test = { x: ball.pos.x, y: ball.pos.y };
            if (ball.pos.x < brick.x) test.x = brick.x;
            else if (ball.pos.x - ball.r > this.dim.w)
              test.x = brick.x + this.dim.w;
            if (ball.pos.y < brick.y) test.y = brick.y;
            else if (ball.pos.y - ball.r > this.dim.h)
              test.y = brick.y + this.dim.h;
            const dx = ball.pos.x - test.x;
            const dy = ball.pos.y - test.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= ball.r) {
              ball.vel.x *= -1;
              brick.status = !1;
            }
          }
        }
      }
    }
  }
}

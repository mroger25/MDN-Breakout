const drawBricks = (ctx, { x, y }, { w, h }) => {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

export class Brick {
  constructor({ w, h }) {
    this.events = {};
    this.court = { w, h };
    this.rows = 3;
    this.cols = 5;
    this.dim = { w: 75, h: 20 };
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.init();
  }

  emit(e, t) {
    const i = this.events[e];
    let status;
    if (i) {
      i.forEach((e) => {
        status = e(t);
      });
    }
    return status;
  }

  on(e, t) {
    if (this.events[e]) {
      this.events[e].push(t);
    } else {
      this.events[e] = [];
      this.events[e].push(t);
    }
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

  update(ctx) {
    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        const brick = this.grid[c][r];
        if (brick.status) {
          drawBricks(ctx, brick, this.dim);
          const n = { pos: brick, dim: this.dim };
          if (this.emit("ckeckCollision", n)) {
            brick.status = !1;
            this.emit("score", 1);
          }
        }
      }
    }
  }
}

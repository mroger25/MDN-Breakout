import { Vector } from "./Vector.js";

const drawBricks = (ctx, { x, y }, { w, h }) => {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

export class Brick {
  constructor(pong) {
    this.court = { w: pong.canvas.width, h: pong.canvas.height };
    this.rows = 3;
    this.cols = 6;
    this.dim = { w: 75, h: 20 };
    this.offsetTop = 30;
    this.offsetLeft = Math.floor((this.court.w - this.cols * this.dim.w) / 4);
    this.padding = Math.floor(
      (this.court.w - this.cols * this.dim.w) / (2 * (this.cols - 1))
    );
    this.init();
  }

  init() {
    this.grid = [];
    for (let c = 0; c < this.cols; c++) {
      this.grid[c] = [];
      for (let r = 0; r < this.rows; r++) {
        this.grid[c][r] = {
          pos: new Vector(
            c * (this.dim.w + this.padding) + this.offsetLeft,
            r * (this.dim.h + this.padding) + this.offsetTop
          ),
          dim: { w: this.dim.w, h: this.dim.h },
          status: !0,
        };
      }
    }
  }

  update() {}

  draw(ctx) {
    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        const brick = this.grid[c][r];
        if (brick.status) {
          drawBricks(ctx, brick.pos, this.dim);
        }
      }
    }
  }
}

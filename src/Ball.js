const drawBall = (ctx, { x, y }, r) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const sum = (a, b) => {
  return { x: a.x + b.x, y: a.y + b.y };
};

export class Ball {
  constructor(pong) {
    this.court = { w: pong.canvas.width, h: pong.canvas.height };
    this.r = 10;
    this.init();
  }

  init() {
    this.pos = { x: this.court.w / 2, y: this.court.h - 50 };
    this.vel = { x: 2, y: -2 };
  }

  update() {
    // Bouncing off the left and right
    const lball = this.pos.x - this.r;
    const rball = this.pos.x + this.r;
    const tball = this.pos.y - this.r;
    const bball = this.pos.y + this.r;
    if (lball + this.vel.x < 0 || rball + this.vel.x > this.court.w) {
      this.vel.x *= -1;
    }
    // Bouncing off the top
    if (tball + this.vel.y < 0) {
      this.vel.y *= -1;
    }
    // End game
    if (bball + this.vel.y > this.court.h) {
      alert("GAME OVER");
      this.init();
    }
    // Moving ball
    this.pos = sum(this.pos, this.vel);
  }
  draw(ctx) {
    // Drawing ball on canvas
    drawBall(ctx, this.pos, this.r);
  }
}

import { CanvasActuator } from "./CanvasActuator.js";
import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";
import { Brick } from "./Brick.js";

const drawScore = (ctx, score) => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);
};

const drawLives = (ctx, lives, w) => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Lives: ${lives}`, w - 65, 20);
};

const sum = (a, b) => {
  return { x: a.x + b.x, y: a.y + b.y };
};

class Sketch {
  constructor() {
    this.court = { w: 480, h: 320 };
    this.myCanvas = new CanvasActuator(this.court);
    this.myCanvas.on("draw", this.draw.bind(this));
    this.ball = new Ball(this.court);
    this.paddle = new Paddle(this.court);
    this.paddle.on("ckeckCollision", this.checkCollision.bind(this));
    // this.myCanvas.on("keydown", this.paddle.move.bind(this.paddle));
    // this.myCanvas.on("keyup", this.paddle.stop.bind(this.paddle));
    this.myCanvas.on("mousemove", this.paddle.mouseMove.bind(this.paddle));
    this.bricks = new Brick(this.court);
    this.bricks.on("ckeckCollision", this.checkCollision.bind(this));
    this.bricks.on("score", this.updateScore.bind(this));
    this.score = 0;
  }

  updateScore(e) {
    this.score += e;
    if (this.score === this.bricks.rows * this.bricks.cols) {
      alert("YOU WIN");
      document.location.reload();
    }
  }

  checkCollision({ pos, dim }) {
    // Checking for collision
    const test = { x: this.ball.pos.x, y: this.ball.pos.y };
    if (this.ball.pos.x < pos.x) {
      test.x = pos.x;
    } else if (this.ball.pos.x > pos.x + dim.w) {
      test.x = pos.x + dim.w;
    }
    if (this.ball.pos.y < pos.y) {
      test.y = pos.y;
    } else if (this.ball.pos.y > pos.y + dim.h) {
      test.y = pos.y + dim.h;
    }
    const dx = this.ball.pos.x - test.x;
    const dy = this.ball.pos.y - test.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= this.ball.r) {
      const k =
        distance /
        (Math.sqrt(
          this.ball.vel.x * this.ball.vel.x + this.ball.vel.y * this.ball.vel.y
        ) *
          1.5);
      const vel = sum(this.ball.vel, {
        x: (this.ball.pos.x - test.x) / k,
        y: (this.ball.pos.y - test.y) / k,
      });
      this.ball.vel = vel;
      return true;
    }
    return false;
  }

  draw() {
    const ctx = this.myCanvas.ctx;
    this.ball.update(ctx);
    this.paddle.update(ctx);
    this.bricks.update(ctx);
    drawScore(ctx, this.score);
    drawLives(ctx, this.ball.lives, this.court.w);
  }
}

new Sketch();

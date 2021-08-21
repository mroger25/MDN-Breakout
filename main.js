import { CanvasActuator } from "./CanvasActuator.js";
import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";
import { Brick } from "./Brick.js";

class Sketch {
  constructor() {
    this.court = { w: 480, h: 320 };
    this.myCanvas = new CanvasActuator(this.court);
    this.myCanvas.on("draw", this.draw.bind(this));
    this.ball = new Ball(this.court);
    this.paddle = new Paddle(this.court);
    this.myCanvas.on("keydown", this.paddle.move.bind(this.paddle));
    this.myCanvas.on("keyup", this.paddle.stop.bind(this.paddle));
    this.bricks = new Brick(this.court);
  }

  draw() {
    const ctx = this.myCanvas.ctx;
    this.ball.update(ctx);
    this.paddle.update(ctx, this.ball);
    this.bricks.update(ctx, this.ball);
  }
}

new Sketch();

import { CanvasActuator } from "./CanvasActuator.js";
import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";

class Sketck {
  constructor() {
    this.court = { w: 640, h: 360 };
    this.pong = new CanvasActuator(this.court, "#EEE");
    this.ball = new Ball(this.pong);
    this.paddle = new Paddle(this.pong);
    this.setup();
  }
  setup() {
    this.pong.on("draw", this.draw.bind(this));
    this.pong.on("update", this.update.bind(this));
    this.pong.on("keydown", this.paddle.move.bind(this.paddle));
    this.pong.on("keyup", this.paddle.stop.bind(this.paddle));
  }
  update() {
    this.ball.update();
    this.paddle.update();
  }
  draw(ctx) {
    this.paddle.draw(ctx);
    this.ball.draw(ctx);
  }
}

new Sketck();

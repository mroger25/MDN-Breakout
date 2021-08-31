import { CanvasActuator } from "./CanvasActuator.js";
import { Vector } from "./Vector.js";
import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";

class Sketck {
  constructor() {
    this.court = { pos: { x: 0, y: 0 }, dim: { w: 640, h: 360 } };
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
  collisionRectCirc(rect, circ) {
    const test = { x: circ.pos.x, y: circ.pos.y };
    if (circ.pos.x > rect.pos.x + rect.dim.w) {
      test.x = rect.pos.x + rect.dim.w;
    } else if (circ.pos.x < rect.pos.x) {
      test.x = rect.pos.x;
    }
    if (circ.pos.y > rect.pos.y + rect.dim.h) {
      test.y = rect.pos.y + rect.dim.h;
    } else if (circ.pos.y < rect.pos.y) {
      test.y = rect.pos.y;
    }
    const dx = circ.pos.x - test.x;
    const dy = circ.pos.y - test.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance > circ.r ? !1 : { x: dx, y: dy };
  }
  update() {
    this.ball.update();
    this.paddle.update();
    this.ball.addVel(this.collisionRectCirc(this.paddle, this.ball));
  }
  draw(ctx) {
    this.paddle.draw(ctx);
    this.ball.draw(ctx);
  }
}

new Sketck();

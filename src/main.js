import { CanvasActuator } from "./CanvasActuator.js";
import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";

function collisionRectBall(rect, ball) {
  // Checking for collision
  const trect = rect.pos.y;
  const brect = rect.pos.y + rect.dim.h;
  const lrect = rect.pos.x;
  const rrect = rect.pos.x + rect.dim.w;
  const tball = ball.pos.y - ball.r;
  const bball = ball.pos.y + ball.r;
  const lball = ball.pos.x - ball.r;
  const rball = ball.pos.x + ball.r;
  if (bball < trect || tball > brect || lball > rrect || rball < lrect) {
    return false;
  } else {
    const test = { x: ball.pos.x, y: ball.pos.y };
    if (ball.pos.x < lrect) {
      test.x = lrect;
    } else if (ball.pos.x > rrect) {
      test.x = rrect;
    }
    if (ball.pos.y < trect) {
      test.y = trect;
    } else if (ball.pos.y > brect) {
      test.y = brect;
    }
    const dx = ball.pos.x - test.x;
    const dy = ball.pos.y - test.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= ball.r) ball.vel.x *= -1;
  }
}

class Sketck {
  constructor() {
    this.court = { w: 640, h: 360 };
    this.game = new CanvasActuator(this.court, "#EEE");
    this.ball = new Ball(this.court);
    this.paddle = new Paddle(this.court);
    this.setup();
  }
  setup() {
    this.game.on("draw", this.draw.bind(this));
  }
  draw() {
    const ctx = this.game.ctx;
    this.paddle.update(ctx);
    this.ball.update(ctx);
  }
}

new Sketck();

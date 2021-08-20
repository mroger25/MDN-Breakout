import { CanvasActuator } from "./CanvasActuator.js";

class Sketch {
  constructor() {
    this.myCanvas = new CanvasActuator(480, 320);
    this.myCanvas.on("draw", this.draw.bind(this));
  }

  draw() {
    const ctx = this.myCanvas.ctx;
  }
}

new Sketch();

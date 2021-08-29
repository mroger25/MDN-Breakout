class Sat {
  constructor(rect, circ) {
    this.rect = new Rect(rect);
    this.circ = new Circ(circ);
  }
}

class Rect {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vertices = [];
    this.scale = 1;
    this.rotation = 0;
  }
  /**
   * @param {int} numOfSides
   * @param {number} radius
   */
  static CreateRect(numOfSides = 3, radius = 100) {
    numOfSides = Math.round(numOfSides);
    if (numOfSides < 3) {
      throw "You need at least 3 sides for a polygon";
    }
    
  }
}

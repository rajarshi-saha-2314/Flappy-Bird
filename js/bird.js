export default class Bird {
  constructor(canvasHeight) {
    this.x = 80;
    this.y = canvasHeight / 2;
    this.width = 40;
    this.height = 30;

    this.gravity = 0.5;
    this.velocity = 0;
    this.lift = -8;
  }

  update(canvasHeight) {
    this.velocity += this.gravity;
    this.y += this.velocity;

    // Prevent going off screen top
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    // Prevent going off bottom
    if (this.y + this.height > canvasHeight) {
      this.y = canvasHeight - this.height;
    }
  }

  flap() {
    this.velocity = this.lift;
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}

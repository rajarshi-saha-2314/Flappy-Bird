import { randomRange } from "./utils.js";

export default class Pipes {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.width = 70;
    this.gap = 160;
    this.speed = 2;

    this.pipes = [];
    this.spawnTimer = 0;
    this.spawnInterval = 1500; // milliseconds
  }

  update(deltaTime) {
    this.spawnTimer += deltaTime;

    if (this.spawnTimer > this.spawnInterval) {
      this.spawnPipe();
      this.spawnTimer = 0;
    }

    this.pipes.forEach(pipe => {
      pipe.x -= this.speed;
    });

    // Remove offscreen pipes
    this.pipes = this.pipes.filter(pipe => pipe.x + this.width > 0);
  }

  spawnPipe() {
    const minHeight = 50;
    const maxHeight = this.canvasHeight - this.gap - minHeight;
    const topHeight = randomRange(minHeight, maxHeight);

    this.pipes.push({
      x: this.canvasWidth,
      topHeight
    });
  }

  draw(ctx) {
    ctx.fillStyle = "green";

    this.pipes.forEach(pipe => {
      // Top pipe
      ctx.fillRect(pipe.x, 0, this.width, pipe.topHeight);

      // Bottom pipe
      const bottomY = pipe.topHeight + this.gap;
      const bottomHeight = this.canvasHeight - bottomY;

      ctx.fillRect(pipe.x, bottomY, this.width, bottomHeight);
    });
  }

  checkCollision(bird) {
    const birdRect = bird.getBounds();

    for (let pipe of this.pipes) {
      const topRect = {
        x: pipe.x,
        y: 0,
        width: this.width,
        height: pipe.topHeight
      };

      const bottomRect = {
        x: pipe.x,
        y: pipe.topHeight + this.gap,
        width: this.width,
        height: this.canvasHeight
      };

      if (
        birdRect.x < topRect.x + topRect.width &&
        birdRect.x + birdRect.width > topRect.x &&
        birdRect.y < topRect.y + topRect.height
      ) {
        return true;
      }

      if (
        birdRect.x < bottomRect.x + bottomRect.width &&
        birdRect.x + birdRect.width > bottomRect.x &&
        birdRect.y + birdRect.height > bottomRect.y
      ) {
        return true;
      }
    }

    return false;
  }
}

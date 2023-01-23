class Enemy {
  constructor(game) {
    this.game = game;
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDelition = false;
    this.lives = 10;
    this.score = this.lives;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
  }

  update() {
    this.x += this.speedX - this.game.speed;
    if (this.x + this.width < 0) {
      // no width property
      this.markedForDelition = true;
    }
    this.frameX < this.maxFrame ? this.frameX++ : (this.frameX = 0);
  }

  draw(context) {
    // context.fillStyle = "red";
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height); //  y, widht, height declated in the child classes
    }
    // context.fillStyle = "black";
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    context.font = "20px Helvetica";
    context.fillText(this.lives, this.x, this.y);
  }
}

export default class Angler1 extends Enemy {
  constructor(game) {
    super(game);
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.image = document.getElementById("enemy1");
    this.frameY = Math.floor(Math.random() * 3);
  }
}

import Projectile from "./Projectile.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.frameX = 0; // cycle through the sprite sheet horizontally
    this.framey = 0; // dettermens the row of the sprite sheet
    this.maxFrame = 37;
    this.speedY = 0;
    //at 0 speed palyer dose not move
    // at positive speed, player will move down
    // at nagative speed, player will move up
    this.maxSpeed = 3; // the speed by pixels at presed key
    this.prejectiles = [];
    this.image = document.getElementById("player");
  }

  update() {
    if (this.game.keys.includes("ArrowUp")) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes("ArrowDown")) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }
    this.y += this.speedY;
    this.prejectiles.forEach((p) => p.update());
    this.prejectiles = this.prejectiles.filter((p) => !p.markedForDeletion);
    //sprite animation
    this.frameX < this.maxFrame ? this.frameX++ : (this.frameX = 0);
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.framey * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.prejectiles.forEach((p) => p.draw(context));
  }

  shootTop() {
    if (this.game.ammo > 0) {
      this.prejectiles.push(new Projectile(this.game, this.x, this.y));
      this.game.ammo--;
    }
  }
}

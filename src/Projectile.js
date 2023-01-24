export default class Projectile {
  constructor(game, x, y) {
    this.game = game;
    this.x = x + 80; // x and y are the start positin of the palyer
    this.y = y + 30; // by adding to x and y, we make the projectal starting positin diferent then tho one fo the playr
    this.width = 10;
    this.height = 3;
    this.speed = 4; // shooting speed
    this.markedForDeletion = false;
    this.image = document.getElementById("projectile");
  }

  update() {
    this.x += this.speed;
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}

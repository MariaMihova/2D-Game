import Enemy from "./Enemy.js";

export default class LuckyEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.95 - this.height); //may go to parent cclass, same at all children
    this.image = document.getElementById("luckyEnemy");
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 5;
    this.score = 15;
    this.type = "lucky";
  }
}

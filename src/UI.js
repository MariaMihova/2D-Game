export default class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fonFamily = "Bangers";
    this.color = "white";
  }

  draw(context) {
    context.save();
    context.fillStyle = this.color;
    context.shadowOffSetX = 2;
    context.shadowOffSetY = 2;
    context.shadowColor = "black";

    context.font = `${this.fontSize}px ${this.fonFamily}`;
    //score
    context.fillText(`Score: ${this.game.score}`, 20, 40);

    //Game timer
    const formatedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText(
      `Timer ${formatedTime}`,
      this.game.width * 0.9,
      this.game.height * 0.15 - 40
    );

    if (this.game.gameOver) {
      context.textAlign = "center";
      let message1, message2;
      if (this.game.score >= this.game.winnigScore) {
        message1 = "Yippee Ki-Yay...";
        message2 = "";
      } else {
        message1 = "When heroes die, I run!";
        message2 = "Run... run!";
      }
      context.font = `100px ${this.fonFamily}`;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 40
      );
      context.font = `75px ${this.fonFamily}`;
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 + 40
      );
    }
    //ammo
    if (this.game.palyer.powerUp) {
      context.fillStyle = "#ffffbd";
    }
    for (let i = 0; i < this.game.ammo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20); //ammo recharging
    }
    context.restore();
  }
}

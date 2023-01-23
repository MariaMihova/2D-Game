export default class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener("keydown", (e) => {
      const index = this.game.keys.indexOf(e.key);
      if ((e.key === "ArrowUp" || e.key === "ArrowDown") && index === -1) {
        this.game.keys.push(e.key);
      } else if (e.key === " ") {
        this.game.palyer.shootTop();
      } else if (e.key === "d") {
        this.game.debug = !this.game.debug;
      }
    });
    window.addEventListener("keyup", (e) => {
      const index = this.game.keys.indexOf(e.key);

      if (index > -1) {
        this.game.keys.splice(index, 1);
      }
    });
  }
}

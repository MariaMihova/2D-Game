import Game from "./Game.js";
window.addEventListener("load", onLoad);

function onLoad(event) {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1700;
  canvas.height = 500;

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime; // timestamp comes from requestAnimationFrame method. It passes it automaticly
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0); // IIF
}

import Player from "./Player.js";
import InputHandler from "./InputHandler.js";
import UI from "./UI.js";
import Angler1 from "./enemy/Enemy1.js";
import Angler2 from "./enemy/Enemy2.js";
import { chechCollision } from "./colisions.js";
import { Background } from "./Background.js";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.background = new Background(this);
    this.palyer = new Player(this);
    this.inputHandler = new InputHandler(this);
    this.ui = new UI(this);
    this.keys = [];
    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000; // interval for adding new enemy
    this.ammo = 20; // start ammo
    this.maxAmmo = 50; // well, max ammo
    this.ammoTimer = 0;
    this.ammoInterval = 500; // we use it to recharge ammo every 500 mls.
    this.gameOver = false;
    this.score = 0;
    this.winnigScore = 50;
    this.gameTime = 0;
    this.timeLimit = 200000; // game time limit
    this.speed = 2;
    this.gdebug = true;
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime;
    }
    if (this.gameTime > this.timeLimit) {
      this.gameOver = true;
    }
    this.background.update();
    this.background.layer4.update();
    this.palyer.update();
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) {
        this.ammo++;
        this.ammoTimer = 0;
      }
    } else {
      this.ammoTimer += deltaTime;
    }

    for (let enemy of this.enemies) {
      enemy.update();
      if (chechCollision(this.palyer, enemy)) {
        enemy.markedForDelition = true;
      }
      for (let proj of this.palyer.prejectiles) {
        if (chechCollision(proj, enemy)) {
          enemy.lives--;
          proj.markedForDelition = true;
          if (enemy.lives <= 0) {
            enemy.markedForDelition = true;
            if (!this.gameOver) {
              this.score += enemy.score;
            }
            if (this.score > this.winnigScore) {
              this.gameOver = true;
            }
          }
        }
      }
    }
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDelition);
    this.palyer.prejectiles = this.palyer.prejectiles.filter(
      (p) => !p.markedForDelition
    );
    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  draw(context) {
    this.background.draw(context); // must be drawn first, si it dose not cover player
    this.palyer.draw(context);
    this.ui.draw(context);
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.background.layer4.draw(context);
  }

  addEnemy() {
    const randomize = Math.random();

    if (randomize < 0.5) {
      this.enemies.push(new Angler1(this));
    } else {
      this.enemies.push(new Angler2(this));
    }
  }
}

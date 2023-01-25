import Player from "./Player.js";
import InputHandler from "./InputHandler.js";
import UI from "./UI.js";
import Angler1 from "./enemy/Enemy1.js";
import Angler2 from "./enemy/Enemy2.js";
import LuckyEnemy from "./enemy/LuckyEnemy.js";
import HaveWhale from "./enemy/HaveWhale.js";
import { chechCollision } from "./colisions.js";
import { Background } from "./Background.js";
import Particle from "./Particle.js";
import Drone from "./enemy/Drone.js";

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
    this.gears = [];
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
    this.timeLimit = 20000; // game time limit 20 sec
    this.speed = 2;
    this.gdebug = false;
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
    this.palyer.update(deltaTime);
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) {
        this.ammo++;
        this.ammoTimer = 0;
      }
    } else {
      this.ammoTimer += deltaTime;
    }

    this.gears.forEach((gear) => gear.update());
    this.gears = this.gears.filter((g) => !g.markedForDelition);

    for (let enemy of this.enemies) {
      enemy.update();
      if (chechCollision(this.palyer, enemy)) {
        enemy.markedForDelition = true;

        // loop code repeating, make function
        for (let i = 0; i < enemy.score; i++) {
          this.gears.push(
            new Particle(
              this,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );
        }

        if (enemy.type === "lucky") {
          this.palyer.enterPowerUp();
        } else {
          this.score--;
          if (this.score < 0) {
            this.score = 0;
          }
        }
      }
      for (let proj of this.palyer.prejectiles) {
        if (chechCollision(proj, enemy)) {
          enemy.lives--;
          proj.markedForDelition = true;
          this.gears.push(
            new Particle(
              this,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );

          if (enemy.lives <= 0) {
            // loop code repeating, make function from line 65
            for (let i = 0; i < enemy.score; i++) {
              this.gears.push(
                new Particle(
                  this,
                  enemy.x + enemy.width * 0.5,
                  enemy.y + enemy.height * 0.5
                )
              );
            }

            enemy.markedForDelition = true;

            if (enemy.type === "hive") {
              for (let i = 0; i < 5; i++) {
                this.enemies.push(
                  new Drone(
                    this,
                    enemy.x + Math.random() * enemy.width,
                    enemy.y + Math.random() * enemy.height * 0.5
                  )
                );
              }
            }

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
    this.ui.draw(context);
    this.palyer.draw(context);
    this.gears.forEach((gear) => gear.draw(context));
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.background.layer4.draw(context);
  }

  addEnemy() {
    const randomize = Math.random();

    if (randomize < 0.3) {
      this.enemies.push(new Angler1(this));
    } else if (randomize < 0.6) {
      this.enemies.push(new Angler2(this));
    } else if (randomize < 0.8) {
      this.enemies.push(new HaveWhale(this));
    } else {
      this.enemies.push(new LuckyEnemy(this));
    }
  }
}

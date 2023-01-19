import { Layer } from "./Layer.js";

export class Background {
  constructor(game) {
    this.game = game;
    this.image1 = document.getElementById("bg1");
    this.image2 = document.getElementById("bg2");
    this.image3 = document.getElementById("bg3");
    this.image4 = document.getElementById("bg4");
    this.layer1 = new Layer(this.game, this.image1, 0.2);
    this.layer2 = new Layer(this.game, this.image2, 0.4);
    this.layer3 = new Layer(this.game, this.image3, 1);
    this.layer4 = new Layer(this.game, this.image4, 0.5);
    this.layers = [this.layer1, this.layer2, this.layer3];
  }

  update() {
    for (let l of this.layers) {
      l.update();
    }
  }

  draw(context) {
    for (let l of this.layers) {
      l.draw(context);
    }
  }
}

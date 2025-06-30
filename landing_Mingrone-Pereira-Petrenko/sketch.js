const sketch = (p) => {
  let puntos = [];

  p.setup = () => {
    let canvas = p.createCanvas(920, 400);
    canvas.parent("miCanvas");
    for (let i = 0; i < 30; i++) {
      puntos.push(new Punto(p));
    }
    p.strokeWeight(1.2);
  };

  p.draw = () => {
    p.background(20, 20, 30, 50);
    for (let i = 0; i < puntos.length; i++) {
      puntos[i].mover();
      puntos[i].mostrar();

      for (let j = i + 1; j < puntos.length; j++) {
        let d = p.dist(puntos[i].x, puntos[i].y, puntos[j].x, puntos[j].y);
        if (d < 100) {
          p.stroke(255, p.map(d, 0, 100, 255, 0));
          p.line(puntos[i].x, puntos[i].y, puntos[j].x, puntos[j].y);
        }
      }
    }
  };

  p.mousePressed = () => {
    puntos.push(new Punto(p, p.mouseX, p.mouseY));
  };

  class Punto {
    constructor(p, x, y) {
      this.p = p;
      this.x = x || p.random(p.width);
      this.y = y || p.random(p.height);
      this.vx = p.random(-0.5, 0.5);
      this.vy = p.random(-0.5, 0.5);
      this.r = p.random(3, 6);
    }

    mover() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > this.p.width) this.vx *= -1;
      if (this.y < 0 || this.y > this.p.height) this.vy *= -1;
    }

    mostrar() {
      this.p.noStroke();
      this.p.fill(255, 200);
      this.p.circle(this.x, this.y, this.r);
    }
  }
};

new p5(sketch);



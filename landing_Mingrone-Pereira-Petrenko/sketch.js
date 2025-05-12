let puntos = [];
let canvas;

function setup() {

  canvas = createCanvas(920, 400);
  for (let i = 0; i < 30; i++) {
    puntos.push(new Punto());
  }
  strokeWeight(1.2);

  canvas.parent('miCanvas');
}

function draw() {
  background(20, 20, 30, 50);

  for (let i = 0; i < puntos.length; i++) {
    puntos[i].mover();
    puntos[i].mostrar();

    // Conexiones
    for (let j = i + 1; j < puntos.length; j++) {
      let d = dist(puntos[i].x, puntos[i].y, puntos[j].x, puntos[j].y);
      if (d < 100) {
        stroke(255, map(d, 0, 100, 255, 0));
        line(puntos[i].x, puntos[i].y, puntos[j].x, puntos[j].y);
      }
    }
  }
}

function mousePressed() {
  puntos.push(new Punto(mouseX, mouseY));
}

class Punto {
  constructor(x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
    this.r = random(3, 6);
  }

  mover() {
    this.x += this.vx;
    this.y += this.vy;

    // Rebote en los bordes
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  mostrar() {
    noStroke();
    fill(255, 200);
    circle(this.x, this.y, this.r);
  }
}


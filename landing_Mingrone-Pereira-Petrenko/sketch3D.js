const sketch3D = (p) => {
  let nodos = [];

  p.setup = () => {
    let canvas = p.createCanvas(p.windowWidth, 600, p.WEBGL);
    canvas.parent("canvas3DContainer");
    p.colorMode(p.HSB, 360, 100, 100);
    p.noStroke();
  };

  p.draw = () => {
    p.background(0);
    p.orbitControl();
    p.directionalLight(255, 255, 255, 1, 1, -1);
    p.ambientLight(40);

    for (let i = 0; i < nodos.length; i++) {
      for (let j = i + 1; j < nodos.length; j++) {
        let d = p5.Vector.dist(nodos[i].pos, nodos[j].pos);
        if (d < 200) {
          p.stroke(255, p.map(d, 0, 200, 255, 50));
          p.line(
            nodos[i].pos.x, nodos[i].pos.y, nodos[i].pos.z,
            nodos[j].pos.x, nodos[j].pos.y, nodos[j].pos.z
          );
        }
      }
    }

    p.noStroke();
    for (let nodo of nodos) {
      p.push();
      p.translate(nodo.pos.x, nodo.pos.y, nodo.pos.z);
      p.ambientMaterial(nodo.color);
      p.sphere(10);
      p.pop();
    }
  };

  p.mousePressed = () => {
  const bounds = p.canvas.getBoundingClientRect();
  const mouseXScreen = p.winMouseX;
  const mouseYScreen = p.winMouseY;

  if (
    mouseXScreen >= bounds.left &&
    mouseXScreen <= bounds.right &&
    mouseYScreen >= bounds.top &&
    mouseYScreen <= bounds.bottom
  ) {
    agregarNodo();
  }
};

  function agregarNodo() {
  let r = 200;
  let pos = p.createVector(
    p.random(-r, r),
    p.random(-r, r),
    p.random(-r, r)
  );
  let c = p.color(p.random(360), 80, 100);
  nodos.push({ pos, color: c });

  cambiarColorDOM(c);
}

function cambiarColorDOM(p5Color) {
  const rgb = p5Color.levels;
  const rgbStr = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  document.querySelectorAll("h1, h2, h3").forEach(el => {
    el.style.color = rgbStr;
  });
}

  window.reiniciarRed = () => {
    nodos = [];
  };
};

new p5(sketch3D);



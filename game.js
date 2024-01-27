import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";
kaboom({
  height: 402,
  width: 600,
});
// loadSound("song", "./assets/song.mp3");
// play("song", {loop: true})

loadFont("font", "./assets/font.otf");

loadSpriteAtlas("assets/tacos.png", {
  counter: {
    x: 0,
    y: 0,
    width: 124,
    height: 62,
  },
  pan_empty: {
    x: 94,
    y: 176,
    width: 30,
    height: 43,
  },
  pan_meat: {
    x: 0,
    y: 81,
    width: 30,
    height: 43,
  },
  pan_meat_cooked: {
    x: 30,
    y: 81,
    width: 30,
    height: 43,
  },
  tortilla_tray: {
    x: 54,
    y: 62,
    width: 16,
    height: 17,
  },
  cheese_tray: {
    x: 36,
    y: 62,
    width: 17,
    height: 17,
  },
  lettuce_tray: {
    x: 18,
    y: 62,
    width: 17,
    height: 17,
  },
  meat_tray: {
    x: 0,
    y: 62,
    width: 17,
    height: 17,
  },
  cheese: {
    x: 29,
    y: 124,
    width: 15,
    height: 15,
  },
  lettuce: {
    x: 15,
    y: 124,
    width: 14,
    height: 14,
  },
  meat: {
    x: 0,
    y: 124,
    width: 14,
    height: 14,
  },
  meat_cooked: {
    x: 0,
    y: 138,
    width: 14,
    height: 14,
  },
  tortilla_empty: {
    x: 76,
    y: 151,
    width: 24,
    height: 24,
  },
  tortilla_cheese: {
    x: 76,
    y: 103,
    width: 24,
    height: 24,
  },
  tortilla_lettuce: {
    x: 100,
    y: 79,
    width: 24,
    height: 24,
  },
  tortilla_meat: {
    x: 76,
    y: 79,
    width: 24,
    height: 24,
  },
  tortilla_lettuce_cheese: {
    x: 100,
    y: 127,
    width: 24,
    height: 24,
  },
  tortilla_lettuce_meat: {
    x: 76,
    y: 127,
    width: 24,
    height: 24,
  },
  tortilla_cheese_meat: {
    x: 100,
    y: 103,
    width: 24,
    height: 24,
  },
  tortilla_lettuce_cheese_meat: {
    x: 100,
    y: 151,
    width: 24,
    height: 24,
  },
  taco_empty: {
    x: 0,
    y: 152,
    width: 26,
    height: 16,
  },
  taco_lettuce: {
    x: 26,
    y: 152,
    width: 26,
    height: 16,
  },
  taco_cheese: {
    x: 26,
    y: 152 + 16,
    width: 26,
    height: 16,
  },
  taco_cheese_lettuce: {
    x: 26,
    y: 152 + 16 * 2,
    width: 26,
    height: 16,
  },
  taco_meat_lettuce: {
    x: 26,
    y: 152 + 16 * 3,
    width: 26,
    height: 16,
  },
  taco_meat: {
    x: 0,
    y: 152 + 16,
    width: 26,
    height: 16,
  },
  taco_meat_cheese: {
    x: 0,
    y: 152 + 16 * 2,
    width: 26,
    height: 16,
  },
  taco_every: {
    x: 0,
    y: 152 + 16 * 3,
    width: 26,
    height: 16,
  },
});

loadSpriteAtlas("assets/UI.png", {
  Roll_btn: {
    x: 0,
    y: 0,
    width: 53,
    height: 36,
  },
  Done_btn: {
    x: 0,
    y: 36,
    width: 56,
    height: 36,
  },
  bin: {
    x: 0,
    y: 72,
    width: 55,
    height: 47,
  },
  make: {
    x: 55,
    y: 0,
    width: 66,
    height: 36,
  },
});

let won = false;

scene("game", () => {
  const tacos = [
    "taco_empty",
    "taco_lettuce",
    "taco_cheese",
    "taco_meat",
    "taco_cheese_lettuce",
    "taco_meat_lettuce",
    "taco_meat_cheese",
    "taco_every",
  ];

  const counter = add([sprite("counter"), scale(4.85)]);
  let pan = add([
    sprite("pan_empty"),
    scale(4.2),
    pos(440, 110),
    area(),
    "pan",
  ]);
  let task = add([
    sprite("make"),
    pos(400, 8),
    scale(2.8),
    // color([57,74,80]),
    // outline(4, rgb(235,237,233))
  ]);
  const randomTaco = tacos[Math.floor(Math.random() * tacos.length)];
  let task_img = add([sprite(randomTaco), pos(430, 60), scale(2.4)]);
  const tortilla_tray = add([
    sprite("tortilla_tray"),
    scale(4.2),
    pos(10, 10),
    area(),
    "tortilla_tray",
  ]);
  const cheese_tray = add([
    sprite("cheese_tray"),
    scale(4.2),
    pos(85, 10),
    area(),
    "cheese_tray",
  ]);
  const lettuce_tray = add([
    sprite("lettuce_tray"),
    scale(4.2),
    pos(165, 10),
    area(),
    "lettuce_tray",
  ]);
  const meat_tray = add([
    sprite("meat_tray"),
    scale(4.2),
    pos(245, 10),
    area(),
    "meat_tray",
  ]);

  add([
    rect(width(), 100),
    pos(0, 300),
    color(32, 46, 55),
    area(),
    scale(2.24),
  ]);
  add([sprite("Roll_btn"), pos(0, 300), area(), scale(2.8), "roll_btn"]);
  add([
    sprite("Done_btn"),
    pos(445, 300),
    area(),
    scale(2.8),
    "done_btn",
    { done: true },
  ]);
  add([sprite("bin"), pos(230, 270), area(), scale(2.8), "bin"]);

  let taco = [];
  let result = "";
  let time = 0;
  let failed = false;
  add([rect(60, 30, { radius: 20 }), pos(352 + 165, 16), color(87, 114, 119)]);
  let timeText = add([text("", { font: "font" }), pos(360 + 170, 10)]);

  setTimeout(() => {
    if (!won) {
      won = false;
      go("end");
    }
  }, 7200);

  setInterval(() => {
    time += 0.1;
    let test = time.toString();
    timeText.use(text(test.toString().substring(0, 3), { font: "font" }));
  }, 100);

  onClick("done_btn", (d) => {
    if (result === randomTaco && !failed) {
      won = true;
      go("end");
    } else {
      won = false;
      go("game");
    }
  });

  onClick("roll_btn", () => {
    destroyAll("t_e");
    if (taco.includes("tortilla_empty")) {
      add([
        sprite("taco_empty"),
        scale(5),
        pos(170, 160),
        area(),
        anchor("center"),
        "taco",
      ]);
      result = "taco_empty";
    }
    if (taco.includes("tortilla_lettuce")) {
      add([
        sprite("taco_lettuce"),
        scale(5),
        pos(170, 160),
        area(),
        anchor("center"),
        "taco",
      ]);
      result = "taco_lettuce";
    }
    if (taco.includes("tortilla_cheese")) {
      add([
        sprite("taco_cheese"),
        scale(5),
        pos(170, 160),
        area(),
        anchor("center"),
        "taco",
      ]);
      result = "taco_cheese";
    }
    if (taco.includes("tortilla_lettuce_cheese")) {
      add([
        sprite("taco_cheese_lettuce"),
        scale(5),
        pos(170, 160),
        area(),
        anchor("center"),
        "taco",
      ]);
      result = "taco_cheese_lettuce";
    }
    if (taco.includes("tortilla_meat")) {
      add([
        sprite("taco_meat"),
        scale(5),
        pos(170, 160),
        area(),
        anchor("center"),
        "taco",
      ]);
      result = "taco_meat";
    }
    if (taco.includes("tortilla_lettuce_meat")) {
      add([
        sprite("taco_meat_lettuce"),
        scale(5),
        pos(170, 160),
        area(),
        anchor("center"),
        "taco",
      ]);
      result = "taco_meat_lettuce";
    }
    if (taco.includes("tortilla_cheese_meat")) {
      add([
        sprite("taco_meat_cheese"),
        scale(5),
        pos(170, 160),
        area(),
        anchor("center"),
        "taco",
      ]);
      result = "taco_meat_cheese";
    }
    if (taco.includes("tortilla_lettuce_cheese_meat")) {
      add([
        sprite("taco_every"),
        scale(5),
        pos(170, 160),
        area(),
        anchor("center"),
        "taco",
      ]);
      result = "taco_every";
    }
  });

  makeDraggable("tortilla_tray", "tortilla_empty", "tortilla_empty");
  makeDraggable("cheese_tray", "cheese", "cheese");
  makeDraggable("lettuce_tray", "lettuce", "lettuce");
  makeDraggable("meat_tray", "meat", "meat");

  function makeDraggable(tt, ts, obj) {
    onClick(tt, () => {
      add([
        sprite(ts),
        pos(0, 0),
        scale(4.2),
        anchor("center"),
        opacity(0.8),
        color(200, 200, 200),
        "draggable",
        {
          [obj]: true,
        },
      ]);
    });
  }

  let dragging = false;
  let hovering = false;
  let hovered = false;
  let hoveringBin = false;

  onClick("taco", (d) => {
    d.use("drag_taco");
  });

  onUpdate("drag_taco", (d) => {
    // console.log(d)
    if (dragging) {
      const offsetX = mousePos().x - d.pos.x;
      const offsetY = mousePos().y - d.pos.y;
      d.pos = vec2(mousePos().x, mousePos().y);
    } else {
      if (hoveringBin) {
        destroy(d);
        taco = [];
      }
    }
  });

  onUpdate("draggable", (d) => {
    if (dragging) {
      const offsetX = mousePos().x - d.pos.x;
      const offsetY = mousePos().y - d.pos.y;
      d.pos = vec2(mousePos().x, mousePos().y);
    } else {
      // const test =
      if (d.pos.y > 128 && !d.meat) {
        if (d.tortilla_empty && !taco.includes("tortilla_empty")) {
          taco.push("tortilla_empty");
        } else if (d.cheese) {
          if (!taco.join().includes("cheese")) {
            if (taco.includes("tortilla_lettuce_meat")) {
              taco.push("tortilla_lettuce_cheese_meat");
            } else if (taco.includes("tortilla_lettuce")) {
              taco.push("tortilla_lettuce_cheese");
            } else if (taco.includes("tortilla_meat")) {
              taco.push("tortilla_cheese_meat");
            } else if (taco.includes("tortilla_empty")) {
              taco.push("tortilla_cheese");
            } else {
              destroy(d);
            }
          }
        } else if (d.lettuce) {
          if (!taco.join().includes("lettuce")) {
            if (taco.includes("tortilla_cheese_meat")) {
              taco.push("tortilla_lettuce_cheese_meat");
            } else if (taco.includes("tortilla_cheese")) {
              taco.push("tortilla_lettuce_cheese");
            } else if (taco.includes("tortilla_meat")) {
              taco.push("tortilla_lettuce_meat");
            } else if (taco.includes("tortilla_empty")) {
              taco.push("tortilla_lettuce");
            } else {
              destroy(d);
            }
          }
        } else if (d.meat_cooked) {
          if (!taco.join().includes("meat")) {
            if (taco.includes("tortilla_lettuce_cheese")) {
              taco.push("tortilla_lettuce_cheese_meat");
              destroy(pan);
              pan = add([
                sprite("pan_empty"),
                scale(4.2),
                pos(440, 110),
                area(),
                "pan",
              ]);
            } else if (taco.includes("tortilla_cheese")) {
              taco.push("tortilla_cheese_meat");
              destroy(pan);
              pan = add([
                sprite("pan_empty"),
                scale(4.2),
                pos(440, 110),
                area(),
                "pan",
              ]);
            } else if (taco.includes("tortilla_lettuce")) {
              taco.push("tortilla_lettuce_meat");
              destroy(pan);
              pan = add([
                sprite("pan_empty"),
                scale(4.2),
                pos(440, 110),
                area(),
                "pan",
              ]);
            } else if (taco.includes("tortilla_empty")) {
              taco.push("tortilla_meat");
              destroy(pan);
              pan = add([
                sprite("pan_empty"),
                scale(4.2),
                pos(440, 110),
                area(),
                "pan",
              ]);
            } else {
              destroy(d);
            }
          }
        }
        destroy(d);
        drawTaco();
      } else if (d.meat) {
        if (hovering) {
          destroy(d);
          pan.use(sprite("pan_meat"));
          wait(3, () => {
            pan.use(sprite("pan_meat_cooked"));
            pan.use("pan_cooked");
            makeDraggable("pan_cooked", "meat_cooked", "meat_cooked");
          });
        } else {
          destroy(d);
          pan.cooked = false;
        }
      } else {
        destroy(d);
      }
    }
  });

  onHover("pan", () => {
    hovering = true;
  });

  onHoverEnd("pan", () => {
    // hovered = true
    hovering = false;
  });
  onHover("bin", () => {
    hoveringBin = true;
  });

  onHoverEnd("bin", () => {
    // hovered = true
    hoveringBin = false;
  });

  function drawTaco() {
    taco.forEach((t) => {
      add([sprite(t), scale(5), pos(120, 130), "t_e"]);
    });
  }

  onMouseDown(() => {
    dragging = true;
  });
  onMouseRelease(() => {
    dragging = false;
  });

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});

scene("end", () => {
  setBackground([0, 0, 0]);
  add([
    text(won ? "You win :D" : "You failed", { font: "font", size: 78 }),
    pos(160, 80),
  ]);
  const btn = add([rect(200, 100), outline(7), pos(200, 180), "btn", area()]);
  btn.add([
    text("Restart", { font: "font", size: 64 }),
    color([0, 0, 0]),
    pos(15, 12),
  ]);

  onClick("btn", () => {
    go("game");
  });
});
scene("start", () => {
  loadSprite("logo", "./assets/logo.png");
  setBackground([65, 29, 49]);
  // add([text(won ? "You win :D" : "You failed", { font: "font", size: 78 }), pos(160, 80)]);
  add([sprite("logo"), scale(3), pos(110, 60)]);
  const btn = add([rect(200, 100), outline(7),opacity(0.5), pos(200, 230), "btn", area()]);
  btn.add([
    text("Play", { font: "font", size: 64 }),
    color([0, 0, 0]),
    pos(48, 12),
  ]);

  onUpdate((c) => {
    btn.pos.y = wave(220, 240, time())
})

  onClick("btn", () => {
    go("game");
  });
});
go("start");

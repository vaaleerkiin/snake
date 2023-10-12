const height = 9;
const width = 9;
let direction = "w";
let snake = [
  { x: 4, y: 5 },
  { x: 4, y: 6 },
  { x: 4, y: 7 },
];
let apple = { x: randomNumber(0, 9), y: randomNumber(0, 9) };

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setDirection(e) {
  if (e.key === "w" || e.key === "s" || e.key === "a" || e.key === "d") {
    direction = e.key;
    console.log(direction);
  }
}

function main() {
  function moveSnake() {
    const head = snake[0];

    if (direction === "w") {
      snake.unshift({ x: head.x, y: head.y - 1 });
    } else if (direction === "s") {
      snake.unshift({ x: head.x, y: head.y + 1 });
    } else if (direction === "a") {
      snake.unshift({ x: head.x - 1, y: head.y });
    } else if (direction === "d") {
      snake.unshift({ x: head.x + 1, y: head.y });
    }
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
      apple = { x: randomNumber(0, 9), y: randomNumber(0, 9) };
    } else {
      snake.pop();
    }
    if (
      snake[0].x === -1 ||
      snake[0].y === -1 ||
      snake[0].x === 10 ||
      snake[0].y === 10
    ) {
      clearInterval(runtime);
      alert("you are dead, reload page to restart");
      snake = [
        { x: 4, y: 5 },
        { x: 4, y: 6 },
        { x: 4, y: 7 },
      ];
    }

    [...snake].forEach((el, index) => {
      if (index === 0) return;
      if (snake[0].x === el.x && snake[0].y === el.y) {
        clearInterval(runtime);
        alert("you are dead, reload page to restart");
        snake = [
          { x: 4, y: 5 },
          { x: 4, y: 6 },
          { x: 4, y: 7 },
        ];
      }
    });
  }

  const markup = [];

  function draw() {
    for (let y = 0; y <= height; y += 1) {
      for (let x = 0; x <= width; x += 1) {
        let isSnakeBlock = false;
        for (const snakeBlock of snake) {
          if (snakeBlock.x === x && snakeBlock.y === y) {
            if (snakeBlock.x === apple.x && snakeBlock.y === apple.y) {
              apple = { x: randomNumber(0, 9), y: randomNumber(0, 9) };
            }
            markup.push(`<div class="snake"></div>`);
            isSnakeBlock = true;
          }
        }
        if (!isSnakeBlock) {
          if (apple.x === x && apple.y === y) {
            markup.push(`<div class="apple"></div>`);
          } else markup.push(`<div class="block"></div>`);
        }
      }
    }
    document.getElementById("wrap").innerHTML = markup.join("");
  }

  moveSnake();
  draw();
}

main();
const runtime = setInterval(main, 1000);

addEventListener("keydown", setDirection);

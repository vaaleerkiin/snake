const height = 19;
const width = 19;
let direction = "w";
const initSnakeState = [
  { x: 4, y: 5, isHead: true },
  { x: 4, y: 6, isHead: false },
  { x: 4, y: 7, isHead: false },
];

let snake = initSnakeState;
let apple = { x: randomNumber(0, width), y: randomNumber(0, height) };

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setDirection(e) {
  if (e.key === "w" || e.key === "s" || e.key === "a" || e.key === "d") {
    direction = e.key;
    console.log(direction);
  }
}

function notify() {
  document
    .querySelector("body")
    .insertAdjacentHTML(
      "afterbegin",
      `<div class="notify"><span>you are dead, reload page to restart</span></div>`
    );
}

function main() {
  function moveSnake() {
    const head = snake[0];
    snake[0].isHead = false;

    if (direction === "w") {
      snake.unshift({ x: head.x, y: head.y - 1, isHead: true });
    } else if (direction === "s") {
      snake.unshift({ x: head.x, y: head.y + 1, isHead: true });
    } else if (direction === "a") {
      snake.unshift({ x: head.x - 1, y: head.y, isHead: true });
    } else if (direction === "d") {
      snake.unshift({ x: head.x + 1, y: head.y, isHead: true });
    }
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
      apple = { x: randomNumber(0, 9), y: randomNumber(0, 9) };
    } else {
      snake.pop();
    }
    if (
      snake[0].x === -1 ||
      snake[0].y === -1 ||
      snake[0].x === width + 1 ||
      snake[0].y === height + 1
    ) {
      clearInterval(runtime);
      notify();
      snake = initSnakeState;
    }

    [...snake].forEach((el, index) => {
      if (index === 0) return;
      if (snake[0].x === el.x && snake[0].y === el.y) {
        snake.splice(index, 1);
        clearInterval(runtime);
        notify();
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
            console.log(snakeBlock);
            snakeBlock.isHead
              ? markup.push(`<div class="snakeHead"></div>`)
              : markup.push(`<div class="snake"></div>`);
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
const runtime = setInterval(main, 500);

addEventListener("keydown", setDirection);

let playField = document.getElementById("playfield");
let restartView = document.getElementById("restart");
let buttonRestart = document.getElementById("btn-restart");
let buttonStart = document.getElementById("btn-start");
let startView = document.getElementById("start");
let player;
let platform;
let platforms = [];
let coins = [];
let refreshRate = 16;
let gameInterval;
let platformInterval;
let i = 0;
let coinsSpawnInterval;

let checkCollisions;

function gameLoop() {
  newPlayer();
  insertFirstPlatform();
  insertSecondPlatform();
  platformInterval = setInterval(generateLevel, 1000);
  gameInterval = setInterval(updateGame, refreshRate);
  newCoin();
}

function newPlayer() {
  player = new Player(300, 200);
  player.spawn();
}

function updateGame() {
  if (player.y + player.height >= 600) {
    endGame();
  } else {
    console.log(player.score);
    player.updatePosition();
    player.checkCollision();
    scoreUpdate();
  }
}

//gameLoop();
window.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    player.jump();
  }
});

function scoreUpdate() {
  let score = document.getElementById("score");
  score.innerText = player.score;
  let endScore = document.getElementById("endScore");
  endScore.innerText = player.score;
}

window.addEventListener("keyup", function (e) {
  if (e.key === " ") {
    player.countJump = 25;
  }
});

let obstacle;

function endGame() {
  playField.style.display = "none";
  restartView.classList.add("show");
  document.body.style.overflow = "hidden";

  player.gameOver();
  platforms.forEach(function (platform) {
    platform.remove();
  });
  platforms = [];
  clearInterval(platformInterval);
  clearInterval(gameInterval);
}

function generateLevel() {
  platform = new Platforms(
    levelConfig[i].width,
    levelConfig[i].height,
    levelConfig[i].x
  );
  console.log("insrrt", levelConfig[i]);
  platform.insert();
  platforms.push(platform);
  i++;
}

function insertFirstPlatform() {
  let firstPlat = new Platforms(1000, 20, 150);
  firstPlat.insert();
  platforms.push(firstPlat);
}

function insertSecondPlatform() {
  let secondPlat = new Platforms(150, 50);
  secondPlat.insert();
  platforms.push(secondPlat);
}

const levelConfig = [
  { width: 200, height: 100 },
  { width: 180, height: 120 },
  { width: 160, height: 90 },
  { width: 220, height: 110 },
  { width: 240, height: 80 },
  { width: 180, height: 130 },
  { width: 160, height: 150 },
  { width: 150, height: 170 },
  { width: 200, height: 130 },
  { width: 180, height: 110 },
  { width: 220, height: 160 },
  { width: 160, height: 140 },
  { width: 190, height: 150 },
  { width: 210, height: 130 },
  { width: 200, height: 120 },
  { width: 160, height: 140 },
  { width: 190, height: 160 },
  { width: 180, height: 100 },
  { width: 220, height: 110 },
  { width: 200, height: 150 },
  { width: 230, height: 170 },
  { width: 250, height: 130 },
  { width: 180, height: 140 },
  { width: 190, height: 120 },
  { width: 200, height: 160 },
  { width: 150, height: 140 },
  { width: 170, height: 150 },
  { width: 210, height: 130 },
  { width: 180, height: 110 },
  { width: 230, height: 170 },
  { width: 220, height: 100 },
  { width: 210, height: 120 },
  { width: 240, height: 90 },
  { width: 200, height: 110 },
  { width: 160, height: 80 },
  { width: 230, height: 130 },
  { width: 220, height: 100 },
  { width: 250, height: 160 },
  { width: 180, height: 140 },
  { width: 190, height: 150 },
  { width: 210, height: 130 },
  { width: 220, height: 120 },
  { width: 170, height: 140 },
  { width: 190, height: 160 },
  { width: 230, height: 100 },
  { width: 250, height: 110 },
  { width: 210, height: 150 },
  { width: 180, height: 170 },
  { width: 200, height: 130 },
];

function insertSecondPlatform() {
  let secondPlat = new Platforms(150, 50);
  secondPlat.insert();
  platforms.push(secondPlat);
}

buttonRestart.addEventListener("click", function (event) {
  clearInterval(coinsSpawnInterval);

  if (coins.length) {
    for (let index = 0; index < coins.length; index++) {
      console.log(coins);
      coins[index].remove();
    }
  }
  coins = [];

  gameLoop();
  playField.style.display = "block";

  restartView.classList.remove("show");
  document.body.style.overflow = "auto";
});

function newCoin() {
  coinsSpawnInterval = setInterval(function () {
    let random = Math.floor(Math.random() * 5);
    let altura = 0;
    if (random == 0) {
      altura = 400;
    }
    if (random == 1) {
      altura = 350;
    }
    if (random == 2) {
      altura = 300;
    }
    if (random == 3) {
      altura = 250;
    }
    if (random == 4) {
      altura = 200;
    }

    let coin = new Coin(1260, altura);
    coins.push(coin);
    coin.insert();
  }, 500);
}

//let coinsSpawnInterval = gameLoop

//coinsSpawnInterval()

buttonStart.addEventListener("click", function (event) {
  gameLoop()
  playField.style.display = "block";
  startView.style.display = "none";
});

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 48;
    this.height = 48;
    this.countJump = 0;
    this.maxCount = 20;
    this.jumpSpeed = 10;
    this.gravity = 6;
    this.isJumping = false;
    this.isGrounded = false;
    this.score = 0;
    this.smash = false;

    this.sprite = document.createElement("div");
  }
  spawn() {
    this.sprite.setAttribute("class", "player");
    this.sprite.style.width = this.width + "px";
    this.sprite.style.height = this.height + "px";
    this.sprite.style.top = this.y + "px";
    this.sprite.style.left = this.x + "px";
    playfield.appendChild(this.sprite);
  }
  jump() {
    if (this.isGrounded) {
      this.isJumping = true;
      this.isGrounded = false;
      this.countJump = 0;
      
    }
  }
  updatePosition() {
    if (this.isJumping) {
      this.sprite.setAttribute("class", "playerJump");
      this.countJump += 1;
      this.y -= this.jumpSpeed;
      if (this.countJump >= this.maxCount) {
        this.isJumping = false;
      }
    } else {
      if (!this.isGrounded) {
        this.y += this.gravity;
      }
    }
    this.sprite.style.top = this.y + "px";
  }
  checkCollision() {
    let collision = platforms.some(function (platform, index) {
      if (
        platform.x < player.x + player.width &&
        platform.y <= player.y + player.height &&
        platform.x + platform.width > player.x &&
        platform.y + platform.height >= player.y
      ) {
        player.checkWalls();
        return true;
      } else {
        return false;
      }
    });
    if (collision) {
      player.isGrounded = true;
      player.isJumping = false;
      this.sprite.setAttribute("class", "player");
    } else {
      player.isGrounded = false;
    }
  }
  checkWalls() {
    let smash = platforms.some(function (platform) {
      if (
        player.x + player.width >= platform.x &&
        player.x < platform.x &&
        player.y + player.height > platform.y +5 &&
        player.y < platform.y + platform.height +5
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (smash) {
      endGame();
    }
  }

  gameOver() {
    playField.removeChild(this.sprite);
  }
}

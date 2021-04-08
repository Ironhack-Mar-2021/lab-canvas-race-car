const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
console.log(ctx)

// ctx.fillRect(0, 0, 50, 70)
let roadImg = new Image()
roadImg.src = './images/road.png'
roadImg.onload = function (e) {
  ctx.drawImage(roadImg, 0, 0, 700, 900)
}


class Car {
  constructor(x, y, w, h, src) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.src = src;
    this.carImg = new Image()
    this.speed = -2
  }
  loadCar = () => {

    this.carImg.src = this.src
    this.carImg.onload = this.drawCar

  }
  drawCar = () => {
    ctx.drawImage(this.carImg, this.x, this.y, this.w, this.h)
  }
  popoMove = () => {
    this.y += this.speed
  }

}

class Obstacle {
  constructor(x, y, w, h, src) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.src = src;
    this.obstacleImg = new Image()
  }
  loadObstacle = () => {

    this.obstacleImg.src = this.src
    this.obstacleImg.onload = this.drawObstacle

  }
  drawObstacle = () => {
    ctx.drawImage(this.obstacleImg, this.x, this.y, this.w, this.h)
    this.y++
  }
}

let ferrari = new Car(canvas.width / 2 + 10, canvas.height / 2 - 50, 50, 100, "./images/car.png")
let popo = new Car(canvas.width / 2 - 100, canvas.height - 100, 160, 160, "./images/Policecar.png")


// let spaceShip = new Car(0, 0, 100, 100, "https://cpng.pikpng.com/pngl/s/267-2676432_simple-spaceship-top-down-spaceship-sprites-clipart.png")

ferrari.loadCar()
popo.loadCar()

// spaceShip.loadCar()

//Rocks
setInterval(() => {
  let rock = new Obstacle(Math.random() * canvas.width - 100, -100, 100, 100, "./images/rock.png")
  rock.loadObstacle()
  obstacles.push(rock)
}, 3000)
let obstacles = []

//popo Cars
setInterval(() => {
  let popoCar = new Car(Math.random() * canvas.width - 100, 1600, 160, 160, "./images/Policecar.png")
  popoCar.loadCar()
  allThePopos.push(popoCar)
}, 3000)
let allThePopos = []



//Collision Detection
function detectCollision(rect1, rect2, frameId) {
  if (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y) {
    // collision detected!
    console.log("COLLISION")
    cancelAnimationFrame(frameId)
    alert("GAME OVER NOOB")
  }
}


function popoCollision(rect1, rect2,) {
  if (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y) {
    // collision detected!
    console.log("COLLISION")
    rect2.speed = 1
    rect2.w = 125
    rect2.h = 50
  }
}

function animate() {
  let frameId = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(roadImg, 0, 0, 700, 900)
  ferrari.drawCar()



  obstacles.forEach(rock => {

    detectCollision(ferrari, rock, frameId)
    rock.drawObstacle()
    // allThePopos.forEach(pop => {
    //   pop.popoMove()
    //   pop.drawCar()
    //   // popoCollision(rock, pop,)
    //   rock.drawObstacle()
    //})
  })

  allThePopos.forEach(pop => {
    obstacles.forEach(rock => popoCollision(rock, pop))
    pop.popoMove()
    pop.drawCar()
  })

  // spaceShip.drawCar()
}

window.onkeydown = function (e) {
  if (e.key === "ArrowLeft") {
    ferrari.x -= 20;
  }
  if (e.key === "ArrowRight") {
    ferrari.x += 20;
  }
  if (e.key === "ArrowUp") {
    ferrari.y -= 20;
  }
  if (e.key === "ArrowDown") {
    ferrari.y += 20;
  }
}

animate()
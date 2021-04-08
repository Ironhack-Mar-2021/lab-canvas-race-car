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
  }
  loadCar = () => {

    this.carImg.src = this.src
    this.carImg.onload = this.drawCar

  }
  drawCar = () => {
    ctx.drawImage(this.carImg, this.x, this.y, this.w, this.h)
  }


}

let ferrari = new Car(canvas.width / 2 + 10, canvas.height / 2 - 50, 50, 100, "./images/car.png")
let popo = new Car(canvas.width / 2 - 100, canvas.height - 100, 160, 160, "./images/Policecar.png")
// let spaceShip = new Car(0, 0, 100, 100, "https://cpng.pikpng.com/pngl/s/267-2676432_simple-spaceship-top-down-spaceship-sprites-clipart.png")

ferrari.loadCar()
popo.loadCar()
// spaceShip.loadCar()

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(roadImg, 0, 0, 700, 900)
  ferrari.drawCar()
  popo.drawCar()
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
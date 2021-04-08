const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
console.log(ctx)

// ctx.fillRect(0, 0, 50, 70)
let roadImg = new Image()
roadImg.src='./../images/road.png'
roadImg.onload=function (e){
  ctx.drawImage(roadImg, 0, 0, 500, 700)
}

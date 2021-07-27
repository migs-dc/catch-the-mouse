document.addEventListener('DOMContentLoaded', () => {
  let context = document.getElementById("canvas").getContext("2d");

  const width = 750;
  const height = 500;
  const catHeight = 40;
  const catWidth = 60;
  const tableHeight = 20;
  const tableWidth = 200;
  
  context.canvas.width = width;
  context.canvas.height = height;

  let cat = {
    height: catHeight,
    width: catWidth,
    x: 375,
    y: height - 20 - catHeight,
    xVelocity: 0,
    yVelocity: 0,
    jumping: false
  }

  catMove = {
    left: false,
    right: false,
    jump: false
  }

  table = {
    height: tableHeight,
    width: tableWidth,
    x: 500,
    y: height - 200
  }

  function keyListener(e) {
    let moving;
    (e.type === "keydown") ? moving = true : moving = false;

    switch(e.keyCode){
      case 37: 
        catMove.left = moving;
        break;
      case 39:
        catMove.right = moving;
        break;

      case 38:
        catMove.jump = moving;
        break;
    }
  }

  function game() {
    if (catMove.jump && !cat.jumping) {
      cat.yVelocity -= Math.abs(cat.xVelocity);
      cat.yVelocity -= 22;
      cat.jumping = true;
    }

    if (catMove.left && cat.x > 0) {
      cat.xVelocity -= 2;
    } else if (catMove.right && cat.x < width - cat.width) {
      cat.xVelocity += 2;
    }

    cat.x += cat.xVelocity;
    cat.xVelocity *= 0.8; // friction

    cat.yVelocity += 2; // gravity
    cat.y += cat.yVelocity;
    console.log(cat.y)

    if (cat.x <= 0){
      catMove.left = false;
      cat.xVelocity = 0;
    } else if (cat.x >= width - cat.width){
      catMove.right = false;
      cat.xVelocity = 0;
    }

    // can't pass through the floor when jumping
    if (cat.y >= height - 20 - catHeight){
      cat.yVelocity = 0;
      cat.jumping = false;
      cat.y = height - 20 - catHeight;
    }

    // // screen pass through
    // if (cat.x < -cat.width) {
    //   cat.x = width;
    // } else if (cat.x > width) {
    //   cat.x = -32;
    // }
    
    context.fillStyle = "#202020"; // canvas
    context.fillRect(0, 0, 750, 500);// x, y, width, height
    
    context.fillStyle = "#BB814C"; // cat
    context.fillRect(cat.x, cat.y, cat.width, cat.height);

    context.fillStyle = "#654321"; // table
    context.fillRect(table.x, table.y, table.width, table.height);
  
    context.fillStyle = "#654321"; // floor
    context.fillRect(0, 480, 750, 20);

    window.requestAnimationFrame(game);
  }


  window.addEventListener("keydown", keyListener);
  window.addEventListener("keyup", keyListener);
  window.requestAnimationFrame(game);
})
document.addEventListener('DOMContentLoaded', () => {
  let context = document.getElementById("canvas").getContext("2d");

  const width = 750;
  const height = 500;
  const catHeight = 40;
  const catWidth = 60;
  const tableHeight = 200;
  const tableWidth = 300;
  const shelfHeight = 350;
  const shelfWidth = 200;

  const floorHeight = 20;
  let minY = floorHeight;
  
  context.canvas.width = width;
  context.canvas.height = height;

  let cat = {
    height: catHeight,
    width: catWidth,
    x: 375,
    y: height - floorHeight - catHeight,
    xVelocity: 0,
    yVelocity: 0,
    jumping: false,
    onPlatform: false
  }

  let shelf = {
    height: shelfHeight,
    width: shelfWidth,
    x: 300,
    y: height - shelfHeight
  }
  
  let table = {
    height: tableHeight,
    width: tableWidth,
    x: 400,
    y: height - tableHeight
  }
  
  let catMove = {
    left: false,
    right: false,
    jump: false,
    drop: false
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
      case 40:
        catMove.drop = moving;
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
    
    cat.yVelocity += 2; 
    cat.y += cat.yVelocity;

    if(catMove.drop){
      console.log("in")
      minY = floorHeight;
    }

    // can't pass through the floor/platform when jumping
    if (cat.y >= height - minY - catHeight){
      cat.yVelocity = 0;
      cat.jumping = false;
      cat.y = height - minY - cat.height;
    }

    // land on table
    if(cat.y <= table.y - cat.height){
      if (cat.x + cat.width > table.x && cat.x < table.x + table.width){    
        // console.log(cat.y, table.height)
        minY = table.height;
      } else {
        minY = floorHeight;
      }
    }

    if(cat.y <= shelf.y - cat.height){
      if (cat.x + cat.width > shelf.x && cat.x < shelf.x + shelf.width){    
        console.log(cat.y, shelf.height)
        minY = shelf.height;
      } else {
        minY = floorHeight;
      }
    }

    // can't go passed the left and right borders
    // if (cat.x <= 0){
    //   catMove.left = false;
    //   cat.xVelocity = 0;
    // } else if (cat.x >= width - cat.width){
    //   catMove.right = false;
    //   cat.xVelocity = 0;
    // }

    // pass through sides
    if (cat.x < -cat.width) {
      cat.x = width;
    } else if (cat.x > width) {
      cat.x = -cat.width;
    }
    
    context.fillStyle = "#202020"; // canvas
    context.fillRect(0, 0, 750, 500);// x, y, width, height

    context.fillStyle = "#1B0000"; // shelf
    context.fillRect(shelf.x, shelf.y, shelf.width, shelf.height);
    
    context.fillStyle = "#331800"; // table
    context.fillRect(table.x, table.y, table.width, table.height);
    
    context.fillStyle = "#BB814C"; // cat
    context.fillRect(cat.x, cat.y, cat.width, cat.height);
    
    context.fillStyle = "#654321"; // floor
    context.fillRect(0, 480, width, floorHeight);

    window.requestAnimationFrame(game);
  }


  window.addEventListener("keydown", keyListener);
  window.addEventListener("keyup", keyListener);
  window.requestAnimationFrame(game);
})
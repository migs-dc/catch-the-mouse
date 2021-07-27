document.addEventListener('DOMContentLoaded', () => {
  let context = document.getElementById("canvas").getContext("2d");
  
  const width = 750;
  const height = 500;
  const catHeight = 40;
  const catWidth = 60;
  const mouseHeight = 15;
  const mouseWidth = 25;
  
  const tableHeight = 150;
  const tableWidth = 300;
  const shelfHeight = 300;
  const shelfWidth = 200;
  
  const floorHeight = 10;
  let minY = floorHeight;
  
  context.canvas.width = width;
  context.canvas.height = height;
  
  let shelf = {
    height: shelfHeight,
    width: shelfWidth,
    x: 300,
    y: height - floorHeight - shelfHeight
  }
  
  let table = {
    height: tableHeight,
    width: tableWidth,
    x: 400,
    y: height - floorHeight - tableHeight
  }
  
  let cat = {
    height: catHeight,
    width: catWidth,
    x: 150,
    y: height - floorHeight - catHeight,
    xVelocity: 0,
    yVelocity: 0,
    jumping: false,
    onPlatform: false
  }
  
  let catMove = {
    left: false,
    right: false,
    jump: false,
    drop: false
  }

  let mouse = {
    height: mouseHeight,
    width: mouseWidth,
    x: 550,
    y: height - floorHeight - mouseHeight
  }

  function keyListener(e) {
    let moving;
    (e.type === "keydown") ? moving = true : moving = false;

    switch(e.keyCode){
      case 37: 
        catMove.left = moving;
        break;
      case 65: 
        catMove.left = moving;
        break;
      
      case 39:
        catMove.right = moving;
        break;
      case 68:
        catMove.right = moving;
        break;

      case 38:
        catMove.jump = moving;
        break;
      case 87:
        catMove.jump = moving;
        break;

      case 40:
        catMove.drop = moving;
        break;
      case 83:
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

    if (catMove.left) {
      cat.xVelocity -= 2;
    } else if (catMove.right) {
      cat.xVelocity += 2;
    }

    cat.x += cat.xVelocity;
    cat.xVelocity *= 0.75; // friction
    
    cat.yVelocity += 2; 
    cat.y += cat.yVelocity;

    // // can't go passed the left and right borders
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

    if(catMove.drop){
      minY = floorHeight;
    }

    // can't pass through the floor/platform when jumping
    if (cat.y >= height - minY - catHeight){
      cat.yVelocity = 0;
      cat.jumping = false;
      cat.y = height - minY - cat.height;
    }

    if(cat.y <= table.y - cat.height){ // land on table
      if (cat.x + cat.width > table.x && cat.x < table.x + table.width){ 
        minY = table.height + floorHeight;
      } else {
        minY = floorHeight;
      }
    }

    if(cat.y <= shelf.y - cat.height){ // land on shelf
      if (cat.x + cat.width > shelf.x && cat.x < shelf.x + shelf.width){    
        minY = shelf.height + floorHeight;
      } else {
        minY = floorHeight;
      }
    }

    //catch the mouse
    

    
    context.fillStyle = "#87cefa"; // canvas
    context.fillRect(0, 0, width, height);// x, y, width, height

    context.fillStyle = "#1B0000"; // shelf
    context.fillRect(shelf.x, shelf.y, shelf.width, shelf.height);
    
    context.fillStyle = "#331800"; // table
    context.fillRect(table.x, table.y, table.width, table.height);

    context.fillStyle = "#A16AE8"; // cat
    context.fillRect(mouse.x, mouse.y, mouse.width, mouse.height);
    
    context.fillStyle = "#BB814C"; // cat
    context.fillRect(cat.x, cat.y, cat.width, cat.height);
    
    context.fillStyle = "#654321"; // floor
    context.fillRect(0, height-floorHeight, width, floorHeight);

    window.requestAnimationFrame(game);
  }

  window.addEventListener("keydown", keyListener);
  window.addEventListener("keyup", keyListener);
  window.requestAnimationFrame(game);
})
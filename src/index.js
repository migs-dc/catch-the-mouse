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
    minY: floorHeight,

    left: false,
    right: false,
    jump: false,
    drop: false
  }

  let mouse = {
    height: mouseHeight,
    width: mouseWidth,
    x: 550,
    y: height - floorHeight - mouseHeight,
    xVelocity: 0,
    yVelocity: 0,
    minY: floorHeight,

    left: false,
    right: false,
    jump: false,
    drop: false
  }

  // initial direction for mouse
  Math.random() > 0.5 ? mouse.left = true : mouse.right = true;

  const animals = [cat, mouse];
  const platforms = [table, shelf];

  function keyListener(e) {
    let moving;
    if(e.type === "keydown"){
      moving = true
    } else if(e.type === "keyup"){
      moving = false;
    } 

    switch(e.keyCode){
      case 37: 
        cat.left = moving;
        break;
      case 65: 
        cat.left = moving;
        break;
      
      case 39:
        cat.right = moving;
        break;
      case 68:
        cat.right = moving;
        break;

      case 38:
        cat.jump = moving;
        break;
      case 87:
        cat.jump = moving;
        break;

      case 40:
        cat.drop = moving;
        break;
      case 83:
        cat.drop = moving;
        break;
    }
  }

  function offScreen(animal) { // pass through sides
    if (animal.x < -animal.width) {
      animal.x = width;
    } else if (animal.x > width) {
      animal.x = -animal.width;
    }
  }

  function setMinY(animal){
    // can't pass through the floor/platform when jumping
    if (animal.y >= height - animal.minY - animal.height){
      animal.yVelocity = 0;
      animal.jumping = false;
      animal.y = height - animal.minY - animal.height;
    }

    platforms.forEach(platform => platforming(animal, platform));
  }

  function platforming(animal, platform){
    if(animal.y <= platform.y - animal.height){ // land on platform
      if (animal.x + animal.width > platform.x && animal.x < platform.x + platform.width){    
        animal.minY = platform.height + floorHeight;
      } else {
        animal.minY = floorHeight;
      }
    }
  }

  function animalMove(animal){
    if (animal.jump && !animal.jumping) {
      animal.yVelocity -= Math.abs(animal.xVelocity);
      animal.yVelocity -= 22;
      animal.jumping = true;
    }

    if (animal.left) { // move left or right
      animal.xVelocity -= 2;
    } else if (animal.right) {
      animal.xVelocity += 2;
    }
    
    animal.x += animal.xVelocity;
    animal.xVelocity *= 0.75; // friction
    
    animal.yVelocity += 2; // gravity
    animal.y += animal.yVelocity;

    if(animal.drop){
      animal.minY = floorHeight;
    }
  }

  function moveCat(){    
    animalMove(cat);
    offScreen(cat);
    setMinY(cat);
  }

  function detechCat(){
    let x = mouse.x - cat.x;
    let xRange = 200;
    let yRange = 150;

    if (cat.y >= mouse.y-yRange && cat.y <= mouse.y+yRange) {
      if(x <= xRange && x >= 0){
        mouse.left = false;
        mouse.right = true;
      } else if (x >= -xRange && x < 0){
        mouse.left = true;
        mouse.right = false;
      }
    }
  }

  function moveMouse(){
    detechCat();
    animalMove(mouse);
    offScreen(mouse);
    setMinY(mouse);
  }

  function catchMouse(){
    let inX = false;
    let inY = false;
    if( (cat.x >= mouse.x && cat.x <= mouse.x + mouse.width) ||
    (cat.x + cat.width >= mouse.x && cat.x + cat.width <= mouse.x + mouse.width)){
      inX = true;
    }
    if( (cat.y >= mouse.y && cat.y <= mouse.y + mouse.height) ||
    (cat.y + cat.height >= mouse.y && cat.y + cat.height <= mouse.y + mouse.height)){
      inY = true;
    }

    if (inX && inY){
      console.log("catch")
      window.alert("Congrats! You caught the mouse!");
    }
  }

  function game() {
    moveCat();
    moveMouse();
    catchMouse();

    //catch the mouse
    
    context.fillStyle = "#87cefa"; // canvas
    context.fillRect(0, 0, width, height);// x, y, width, height

    context.fillStyle = "#1B0000"; // shelf
    context.fillRect(shelf.x, shelf.y, shelf.width, shelf.height);
    
    context.fillStyle = "#331800"; // table
    context.fillRect(table.x, table.y, table.width, table.height);

    context.fillStyle = "#A16AE8"; // mouse
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
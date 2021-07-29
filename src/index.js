document.addEventListener('DOMContentLoaded', () => {
  let context = document.getElementById("canvas").getContext("2d");
  let tableImage = document.getElementById("table");
  let catRightImage = document.getElementById("cat-right");
  let catLeftImage = document.getElementById("cat-left");
  let mouseRightImage = document.getElementById("mouse-right");
  let mouseLeftImage = document.getElementById("mouse-left");
  let roomImage = document.getElementById("room");

  const width = 1500;
  const height = 700;
  const catHeight = 75;
  const catWidth = 100;
  const mouseHeight = 25;
  const mouseWidth = 45;
  
  const tableHeight = 150;
  const tableWidth = 300;
  const shelfHeight = 300;
  const shelfWidth = 200;
  const dresserHeight = 200;
  const dresserWidth = 300;
  const bedHeight = 100;
  const bedWidth = 400;

  const floorHeight = 10;
  
  context.canvas.width = width;
  context.canvas.height = height;

  let floor = {
    height: floorHeight,
    width: width,
    x: 0,
    y: height - floorHeight
  }
  
  let shelf = {
    height: shelfHeight,
    width: shelfWidth,
    x: 300,
    y: height - floorHeight - shelfHeight
  }
  
  let table = {
    height: tableHeight,
    width: tableWidth,
    x: 40,
    y: height - floorHeight - tableHeight
  }

  let dresser = {
    height: dresserHeight,
    width: dresserWidth,
    x: 700,
    y: height - floorHeight - dresserHeight
  }

  let bed = {
    height: bedHeight,
    width: bedWidth,
    x: 1050,
    y: height - floorHeight - bedHeight
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
    speed: 2,

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
    speed: 1.75,

    left: false,
    right: false,
    jump: false,
    drop: false
  }

  // initial direction for mouse
  Math.random() > 0.5 ? mouse.left = true : mouse.right = true;

  const animals = [cat, mouse];
  const platforms = [floor, bed, table, shelf, dresser];
  const furniture = [bed, table, shelf, dresser];

  function keyListener(e){
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
    // console.log(platform);
    if(animal.y <= platform.y - animal.height){ // land on platform
      if (animal.x + animal.width > platform.x && animal.x < platform.x + platform.width){    
        animal.minY = platform.height + floorHeight;

        if (platform.height === floorHeight){
          animal.minY = floorHeight;
        }
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
      animal.xVelocity -= animal.speed;
    } else if (animal.right) {
      animal.xVelocity += animal.speed;
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
    setMinY(cat);
    offScreen(cat);
  }

  function detect(target){
    let x = mouse.x - target.x;
    let xRange = 250;
    let yRange = 150;

    let res = [];

    if (target.y >= mouse.y-yRange && target.y <= mouse.y+yRange) { //check if target is within yRange
      if (mouse.left){ // mouse going left
        if(x <= xRange && x >= 0){ //left check
          res.push("ahead");
        } else if (x >= -xRange + xRange*.5 && x < 0){ //right check
          res.push("behind");
        } else {
          res.push("none");
        }
      } else if (mouse.right){ // mouse going right
        if(x <= xRange - xRange*.5 && x >= 0){ //left check
          res.push("behind");
        } else if (x >= -xRange && x < 0){ //right check
          res.push("ahead");
        } else {
          res.push("none");
        }
      }

      // check if target is above or below the mouse      
      if (target.y + target.height === mouse.y + mouse.height) {        
        res.push("same")
      } else if (target.y + target.height < mouse.y){ // bottom of target is above mouse
        res.push("above")
      } else if (target.y > mouse.y + target.height){ // buttom of mouse if above the garget
        res.push("below")
      }
    }
    return res;
  }

  function mousePath(){
    let [x, y] = detect(cat);
    mouse.drop = false;
    mouse.jump = false;

    if (x === "ahead"){
      mouse.right = !mouse.right;
      mouse.left = !mouse.left;
      mouse.speed = 1.9;
    } else if (x === "behind"){
      mouse.speed = 1.9;
    } else if (x === "none"){
      mouse.speed = 1.75;
      return;
    }


    if (y === "above"){
      mouse.drop = true; 
    } else if (y === "below"){
      mouse.jump = true;
    } else if (y === "same" || mouse.minY === floorHeight){
      if(Math.random() > 0.5) { mouse.jump = true }
    } else {
      (Math.random() > 0.5) ? mouse.jump = true : mouse.drop = true;
    }
  }

  function mouseJump(){

  }

  function moveMouse(){
    mousePath();
    animalMove(mouse);
    setMinY(mouse);
    offScreen(mouse);
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
      return true;
    }
    return false;
  }

  function game() {
    moveCat();
    moveMouse();
    // mouse.jump = true;

    context.drawImage(room, 0, 0, width, height)
    
    // context.fillStyle = "#87cefa"; // canvas
    // context.fillRect(0, 0, width, height);// x, y, width, height

    // context.fillStyle = "#1B0000"; // shelf
    // context.fillRect(shelf.x, shelf.y, shelf.width, shelf.height);
    
    // // context.fillStyle = "#331800"; // table
    // // context.fillRect(table.x, table.y, table.width, table.height);
    // context.drawImage(tableImage, table.x, table.y, table.width, table.height);
    
    // context.fillStyle = "#331800"; // dresser
    // context.fillRect(dresser.x, dresser.y, dresser.width, dresser.height);

    // context.fillStyle = "#8B4513"; // bed
    // context.fillRect(bed.x, bed.y, bed.width, bed.height);
    
    // context.fillStyle = "#654321"; // floor
    // context.fillRect(floor.x, floor.y, floor.width, floor.height);

    // context.fillStyle = "#BB814C"; // cat
    // context.fillRect(cat.x, cat.y, cat.width, cat.height);

    // context.fillStyle = "#A16AE8"; // mouse
    // context.fillRect(mouse.x, mouse.y, mouse.width, mouse.height);
    
    if (cat.right) { 
      context.drawImage(catRightImage, cat.x, cat.y, cat.width+5, cat.height+5)
    } else if (cat.left) {
      context.drawImage(catLeftImage, cat.x, cat.y, cat.width+5, cat.height+5)
    } else if (!cat.left && !cat.right) {
      context.drawImage(catRightImage, cat.x, cat.y, cat.width+5, cat.height+5)
    }

    if (mouse.right) { 
      context.drawImage(mouseRightImage, mouse.x, mouse.y, mouse.width+5, mouse.height+5)
    } else if (mouse.left) {
      context.drawImage(mouseLeftImage, mouse.x, mouse.y, mouse.width+5, mouse.height+5)
    } else if (!mouse.left && !mouse.right) {
      context.drawImage(mouseRightImage, mouse.x, mouse.y, mouse.width+5, mouse.height+5)
    }
    
    if(catchMouse()){
      console.log("catch")      
      let messageBox = document.getElementById("message")
      messageBox.append(" CONGRATS, you caught the mouse!")      
      return
    }

    window.requestAnimationFrame(game);
  }
  window.addEventListener("keydown", keyListener);
  window.addEventListener("keyup", keyListener);
  window.requestAnimationFrame(game);
})
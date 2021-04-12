var balloon,balloonImage1,balloonImage2;
var database,position;

function preload(){
   bg =loadImage("cityImage.png");

   balloonImage1=loadAnimation("hotairballoon1.png");

   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png","hotairballoon1.png","hotairballoon2.png","hotairballoon2.png","hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup() {
  database = firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(height.x,height.y,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readheight,showError);

  textSize(20); 
}

function draw() {
  background(bg);
  
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!**",40,40);
  text(mouseX + ", " + mouseY, 100,100);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage1);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage1);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage1);
    balloon.scale = balloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage1);
    balloon.scale = balloon.scale +0.01;
  }

  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readheight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}

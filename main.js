noseX = "";
noseY = "";
GameStatus = "";

function startGame()
{
	GameStatus = "start";
	document.getElementById("status").innerHTML = "Game Is Loading";
}

function game(){
	console.log("noseX = " + noseX +", noseY = " + noseY);
}

function preload() {
	world_start = loadSound("world_start.wav");
	setSprites();
	MarioAnimation();
}

function setup() {
	canvas = createCanvas(1240,336);
	canvas.parent('canvas');
	
	instializeInSetup(mario);

	video = createCapture(VIDEO);
	video.size(800,400);
	video.parent('game_console');

	poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
	console.log('Model Loaded!');
  }
  
  function gotPoses(results)
  {
	if(results.length > 0)
	{
		console.log(results);
	  noseX = results[0].pose.nose.x;
	  noseY = results[0].pose.nose.y;
	}
  }

function draw() {
	game()
}
function changeGameStatud(character){
	if(GameStatus=="start"&& noseX !="" && gameConfig.status==="start") {
		world_start.play();
	}
}
function manualControl(character){

	if(character.live){
		if(noseX < 300){
			character.velocity.x-=gameConfig.moveSpeed;
			character.changeAnimation('move');
			character.mirrorX(-1);
		}

		if(keyDown(noseX < 300)){
			character.velocity.x-=gameConfig.moveSpeed;
			character.changeAnimation('move');
			character.mirrorX(1);
		}

		if(!keyDown(control.left)&&!keyDown(noseX < 300)&&!keyDown(control.up)){
            character.changeAnimation('stand');
		}
	
}

}
function jumping(character){
	if( ( noseY < 200 && character.live ) || (touchIsDown&&character.live) ){
		character.velocity.y+=gameConfig.jump;
	}
}




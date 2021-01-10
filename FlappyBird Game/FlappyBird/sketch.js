var Bird, Bird_Falling, Bird_Rising, BirdIMG, Bird_FallingIMG, Bird_RisingIMG;

var Pipes,Pipe1IMG, Pipe2IMG, Pipe1, Pipe2, PipesGroup;

var BackGround, BackGroundIMG;

var Ground;

var GameOver, Reset, GameOverIMG, ResetIMG;

var Start, StartIMG;

var logo, logoIMG;

var lives; 

var gameState=PLAY;

var PLAY= 1;

var END= 0;

var score= 0;

function preload(){

    BirdIMG= loadAnimation("Images/flappybird1.png","Images/flappybird2.png");

    Bird_FallingIMG= loadImage("Images/Falling_Down.png");

    BackGroundIMG= loadImage("Images/background.png");

    GameOverIMG= loadImage("Images/gameover.png");

    ResetIMG= loadImage("Images/reset.png");

    Pipe1IMG= loadImage("Images/pipes.png");

    Pipe2IMG= loadImage("Images/pipes2.png");

    StartIMG= loadImage("Images/start.png");

    logoIMG= loadImage("Images/logo.png");
}

function setup(){
    createCanvas(1350,800);

    Bird= createSprite(200,400,20,20);
    Bird.addAnimation("Bird",BirdIMG);
    Bird.scale= 0.3;

    BackGround=createSprite(150,400,1350,800);
    BackGround.addImage(BackGroundIMG);
    BackGround.x=BackGround.width/2;
    BackGround.velocityX=-3;

    Ground=createSprite(500,775,1350,25);
    Ground.visible= false;
    Ground.x=Ground.width/2;
    Ground.velocityX=-3;

    Reset= createSprite(675,600,60,60);
    Reset.addImage(ResetIMG);
    Reset.scale=0.3;

    Start= createSprite(675,400,60,60);
    Start.addImage(StartIMG);
    Start.scale= 0.3;

    GameOver= createSprite(675,500, 60,60);
    GameOver.addImage(GameOverIMG);
    GameOver.scale= 0.3;

    logo= createSprite(675,200,100,100);
    logo.addImage(logoIMG);

    GameOver.visible=false;
    Reset.visible=false;

    PipesGroup=new Group();
}


function draw(){

text("Score:"+score, 1200,40);

if(gameState=== PLAY){
    score=score+Math.round(getFrameRate()/60);
    if(keyDown("space")){
        Bird.velocityY=-11;
        }
        Bird.velocityY = +0.75;

        if(BackGround.x<0){
            BackGround.x=BackGround.width/2;
        }
        BackGround.velocityX=-3;
        MakesPipes();

        if(Bird.isTouching(PipesGroup) || Bird.isTouching(Ground)){
            gameState=END;
        }
    }
else if(gameState=== END){
    GameOver.visible=true
    Reset.visible=true
    Bird.velocityX=0;
    BackGround.VelocityX=0;
    Ground.velocityX=0;
    PipesGroup.setvelocityXeach(0);

}

drawSprites();
}
function MakePipes(){
    if(frameCount%75===0){
        Pipes=createSprite(1350,750,40,100);
        Pipes.velocityX=-(4+3*score/100);
        rand=random(1,2);
        switch(rand){
            case 1 : Pipes.addImage(Pipe1IMG);
            break;
            case 2 : Pipes.addImage(Pipe2IMG);
            break;
            default : break;

        }
        PipesGroup.add(Pipes);
    }
}
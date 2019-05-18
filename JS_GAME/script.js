//starting canvas
let canvas = document.getElementById( "myCanvas");
let context=canvas.getContext('2d');
canvas.width=600;
canvas.height=600;
//barriers design
let blocks = [];
let heightToFirstBlock =75;
let initialNumberOfBlocks=10;
let acceleration =[0.5];
let velocity=[0.2,0.7];
let  firstDistanceToBlocks=75;
let  horizontalDistance=[60];
let  verticalDistance=[60];
const minmumBlockWidth = 130;
const minmumBlockHeight = 25;
let currentBlock=null;



/* ----------------------local varaiables -----------------------------------------------------*/

let colorArray=['#3F9AA5','#03585D','#FA7268','#D93E3A','#D93E3A'];
let blockProperties={
  x:undefined,
  y:undefined,
  width:undefined,
  height:undefined,
};



class block
{
            
            constructor (x,y,width,height,color=1){
            this.x =x;
            this.y =y;
            this.width =width;
            this.height =height;
              this.color=color;
            }
    
    draw(){
        context.beginPath();
        context.lineWidth = "6";
        context.fillStyle=colorArray[this.color];
        // context.fillStyle=colorArray[this.color];
        // context.fillRect(this.x , this.y ,this.width,this.height);
        var im = new Image ();
        im.src="images/block.png";
        let pattern=context.createPattern(im,'repeat');
        context.fillStyle=pattern;
        context.drawImage(im,this.x , this.y ,this.width,this.height);

        
    }


    
}
/*----------------------------------------------------------------------------------------------------------------- */

/* ----------------------utility  functions -------------------------------------------------------*/
function randomMinMax(min,max){
  return Math.floor(Math.random()*(max-min+1) +min );
}


/*----------------------------------------------------------------------------------------------------------------- */

/* -------------------------window module ------------------------------------*/


let t=false;

function drawBlocks(){
  context.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i <blocks.length ;i++)
  {
      blocks[i].draw();

  }
}




 

function initBlocks(){
blocks=[];
blockProperties.width=randomMinMax( minmumBlockWidth,canvas.width*0.09 + minmumBlockWidth);
blockProperties.height=randomMinMax( minmumBlockHeight,canvas.height*0.01 + minmumBlockHeight);
blockProperties.x=randomMinMax(100,canvas.width-blockProperties.width );
blockProperties.y=canvas.height-firstDistanceToBlocks-blockProperties.height; 
blocks.push(new block(blockProperties.x,blockProperties.y,blockProperties.width,blockProperties.height));
for(let i=1;i<initialNumberOfBlocks;i++)
{
blockProperties.width=randomMinMax( minmumBlockWidth,canvas.width*0.09 + minmumBlockWidth);
blockProperties.height=randomMinMax( minmumBlockHeight,canvas.height*0.01 + minmumBlockHeight);
blockProperties.x=(randomMinMax(horizontalDistance[0],horizontalDistance[0]*1.2 )+ blocks[i-1].x)%(canvas.width-blockProperties.width);
blockProperties.y=blocks[i-1].y-verticalDistance[0]-blockProperties.height *(1+randomMinMax(0,0.1)); 
blocks.push(new block(blockProperties.x,blockProperties.y,blockProperties.width,blockProperties.height));


}


drawBlocks();
}

function addblock(){
let i=blocks.length;
blockProperties.width=randomMinMax( minmumBlockWidth,canvas.width*0.2 + minmumBlockWidth);
blockProperties.height=randomMinMax( minmumBlockHeight,canvas.height*0.03 + minmumBlockHeight);
blockProperties.x=(randomMinMax(0.5*horizontalDistance[0],horizontalDistance[0]*1.3 )+ blocks[0].x)%(canvas.width-blockProperties.width);
sortBlocks();
blockProperties.y=blocks[0].y-verticalDistance[0]-blockProperties.height*1.5 ; 
blocks.unshift(new block(blockProperties.x,blockProperties.y,blockProperties.width,blockProperties.height));

}

function movingBlocks(){
  // velocit/y[0] += acceleration[0];

  let counter=0;
  let removedBlocks=0; 
  while( counter < 15){
    counter += velocity[0];
  for(let i=0;i<blocks.length;i++)
  {
    blocks[i].y =blocks[i].y + velocity[0];
       if(blocks[i].y > canvas.height)
        {blocks.splice(i,1);
          addblock();
          removedBlocks++;}


  }
 char1.align( velocity[0]);
  drawBlocks();
	 char1.draw();	

  }
  return removedBlocks;
}

let frequency=0;
function movingScreen(){
    
    for(let i=0;i<blocks.length;i++)
    {
      blocks[i].y =blocks[i].y + velocity[1];
         if(blocks[i].y > canvas.height)
          {blocks.splice(i,1);
            addblock();}
    }
    console.log(currentScore)
    if(currentScore>=1000  && currentScore<2000 ){
        frequency++;
        if(frequency<3 ){
            blocks[currentBlock].x =blocks[currentBlock].x +10;
        }   
        
        if( frequency <=6 && frequency>3)
            {
                blocks[currentBlock].x =blocks[currentBlock].x -10;
                if(frequency==6)
                    frequency=0;
            }
    }
    if(currentScore>=2000 ){
        frequency++;
        if(frequency<3 ){
            blocks[currentBlock].x =blocks[currentBlock].x +12;
            blocks[currentBlock].y =blocks[currentBlock].y + randomMinMax(-3,3);
        }   
        
        if( frequency <=6 && frequency>3)
            {
                blocks[currentBlock].x =blocks[currentBlock].x -12;
                blocks[currentBlock].y =blocks[currentBlock].y +randomMinMax(-3,3);
                if(frequency==6)
                    frequency=0;
            }
    }
    
    
    drawBlocks();
    // if(char1.onGround==true)
   {
    char1.align( velocity[1]);
    char1.draw();	
   } 
  }


function sortBlocks(){
  let swapped;
      do {
          swapped = false;
          for (let i=0; i < blocks.length-1; i++) {
              if (blocks[i].y > blocks[i+1].y) {
                  let temp = blocks[i];
                  blocks[i] = blocks[i+1];
                  blocks[i+1] = temp;
                  swapped = true;


              }
          }
      } while (swapped);
}
let highestBIndex

function highestBlockIndex(){
          for (let i=0; i < blocks.length-1; i++) {
		  if (blocks[i].y<=0){highestBIndex=i-1;break}}
}

let i = 1
let j = 1
let z = 1
var exitFlag = false;
let moveflag = false;
let updateScore = document.querySelector(".game-score span"); 
class character {
    constructor(x, y, width, height) {
        this.x1 = x;
        this.y1 = y;
        this.boy = 1;
        this.width = width;
        this.height = height;
        this.dx = 0;
        this.dy = 0;
        this.moveSpeed = 2; //new
        this.jumpPower = -7, // power of jump
        this.onGround = true
        this.numberOfbarriers = 0 // willbe used to calculate score
    }

    draw() {
        var boy = new Image()

        if (this.onGround == false && this.dy < 0) {
            boy.src = '../JS_GAME/images/jump_up' + char1.boy + '.png'
        } else if (this.onGround == false && this.dy > 0) {
            boy.src = '../JS_GAME/images/jump_fall' + char1.boy + '.png'
        } else {
            if (moveflag == false) {
                boy.src = '../JS_GAME/images/standing_frame' + char1.boy + '-' + Math.floor(j / 10 + 1) + '.png'
            } else {
                boy.src = '../JS_GAME/images/running_frame' + char1.boy + '-' + Math.floor(i / 10 + 1) + '.png'
            }
        }
        if (gameOver == true) {
            boy.src = '../JS_GAME/images/frame-got-hit' + char1.boy + '.png'
        }
        context.drawImage(boy, this.x1, this.y1, this.width, this.height); // draw image 
        j += 1
        i += 1
        if (Math.floor(i / 10 + 1) >= 7) {
            i = 1
        }
        if (Math.floor(j / 10 + 1) >= 3) {
            j = 1
        }
        // context.fillText(currentScore,250,250);
        updateScore.innerHTML = currentScore;
        if(currentScore === 1000) {
            document.querySelector(".first-badge").style.opacity = "1";
        }
        if (currentScore === 2000){
            document.querySelector(".second-badge").style.opacity = "1";
        }
        if (currentScore === 3000){
            document.querySelector(".third-badge").style.opacity = "1";
        }
    }

    updatePosition() {
        // apply gravity drag and move player

        if (this.x1 + this.width + this.dx > canvas.width || this.x1 + this.dx < 0) { //detect collision
            this.dx = -this.dx;
        }
        this.x1 += this.dx;
        this.y1 += this.dy;

        // test ground contact and left and right limits
        if (this.y1 + this.height >= game.ground) {
            this.y1 = game.ground - this.height;
            this.dy = 0;
            this.onGround = true;
        } else {
            this.onGround = false;
        }

    }
    align(x) {

        this.y1=this.y1+x;

    }
    gravity() {
        if (this.onGround == false) {
            this.dy += game.gravity;
            this.dy *= game.drag;
        } else {
            this.dy = 0
        }
        this.dx *= this.onGround ? game.groundDrag : game.drag;
    }
    up() {
        this.onGround = false
        this.dy = this.jumpPower // to be called when  up arrow is pressed with hight 
    }

    runLeft() {
        this.dx = -this.moveSpeed // to be called when  up arrow is pressed with hight 
        moveflag = true
    }
    runRight() {
        this.dx = this.moveSpeed
        moveflag = true
    }

}

//keyboard handler
const keyboard = (() => {
    document.addEventListener("keydown", keyHandler);
    document.addEventListener("keyup", keyHandler);
    const keyboard = {
        right: false,
        left: false,
        up: false,
        esc: false,
        any: false,
    };

    function keyHandler(e) {
        const state = e.type === "keydown"
        if (e.keyCode == 39) {
            keyboard.right = state;
        } else if (e.keyCode == 37) {
            keyboard.left = state;
        } else if (e.keyCode == 38) {
            keyboard.up = state;
            e.preventDefault();
        } else if (e.keyCode == 27) {
            keyboard.esc = state;
            e.preventDefault();
        }
        if (state) {
            keyboard.any = true
        } // must reset when used
    }
    return keyboard;
})();


// define game data
const game = {
    gravity: 0.2, // strength per frame of gravity
    drag: 0.999, // play with this value to change drag
    groundDrag: 0.9, // play with this value to change ground movement
    ground: canvas.height
}
// function working on both objects(character,barrier)


function checkLive() {
    if (char1.y1 + char1.height >= game.ground) {
        char1.onGround = true
        if (moveScreenCounter > 3) {
            gameOver = true
        } //gameover condition

    } else {
        char1.onGround = false
    }
  for(let i=0;i <blocks.length ;i++){
	  if  (blocks[i].x<char1.x1+char1.width-.13*char1.width && char1.x1<blocks[i].x+blocks[i].width-.131*char1.width  && blocks[i].y<=char1.y1+char1.height && char1.y1+char1.height<blocks[i].y+10) {
		  char1.onGround=true;
          moveScreenFlag=false;
			currentBlock=i;


          if(char1.y1 >0 && char1.y1 <=300  )
            {
                openscreen =true;
            }
            else 
            { openscreen =false; } 
	  }
  }
}
//run animation
let openscreen =false;
let nonrepeat =true;
let moveScreenFlag = false
let gameOver = false
let moveScreenCounter = 0
let currentScore=0
let levelScore=5
let width = 50
let height = 50
let alphabet_index = 0
let currentUser
let escape = false
// styles
let gradient = context.createLinearGradient(0, 0, canvas.width, 0);
let gradient2 = context.createLinearGradient(0, 0, canvas.width, 0);
context.font = "70px Verdana";
tex_width = context.measureText('Game Over').width
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5", "green");
gradient.addColorStop("1.0", "red");
gradient2.addColorStop("0", "red");
gradient2.addColorStop("0.5", "green");
gradient2.addColorStop("1.0", "magenta");

let tex = ['G', 'a', 'm', 'e', ' ', 'O', 'v', 'e', 'r']
let tex_string = ''
let char1 = new character(canvas.width / 2 - width / 2, game.ground - height, width, height);
var hero = localStorage.getItem('hero');
char1.boy = hero;
var myanim
char1.draw();
initBlocks();
mainLoop();
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
let overModal = document.getElementById('overModal');
let pauseModal = document.getElementById('pauseModal');
let modalFlag = false;
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == pauseModal) {
        pauseModal.style.display = "none";
    }
}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function mainLoop() {
    if (gameOver == false) 
    {
        if (keyboard.esc == false && escape == false) {
            moveflag = false
            if (keyboard.up && char1.onGround) {
                char1.up()
            }
            if (keyboard.left) {
                char1.runLeft()
            }
            if (keyboard.right) {
                char1.runRight()
            }
            if (moveflag == true) { //increase horizontal speed with conyinous press
                if (char1.moveSpeed < 7) {
                    char1.moveSpeed += .1
                    char1.jumpPower = -7
                } else {
                    char1.jumpPower = -10
                }
            } else {
                char1.jumpPower = -7
                char1.moveSpeed = 2
            }
            char1.updatePosition();
			    if(moveScreenCounter >10) 
    movingScreen();
            checkLive();
            char1.gravity();
            context.clearRect(0, 0, canvas.width, canvas.height);
            highestBlockIndex();
            //highestBIndex
    if( openscreen && (char1.y1 < 400) && char1.onGround)
       { movingBlocks();
   moveScreenFlag = true
        moveScreenCounter+=1;
        char1.onGround=false; }
            drawBlocks();
            char1.draw();
        } else {
            escape = true; /////
            pauseModal.style.display = "block";
            keyboard.esc = false;
            pauseModal.querySelector(".closeModal").addEventListener("click", function () {
                pauseModal.style.display = "none";
                escape = false;
            });
            pauseModal.querySelector(".exit").addEventListener("click", function () {
				escape = true
                if (escape == true) {
                    exitFlag = true;
                };
            });
            keyboard.esc = false

            //to add condition if true then leave to main menue
        }
    }
    //game over part
    else {
        document.getElementById("gameoverscore").innerText=currentScore;
        localStorage.setItem("currentScore",currentScore)
        if (z == 280) {
            //////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////
            overModal.style.display = "block";
            btn = overModal.querySelector(".btn").addEventListener("click", function () {
                currentUser = overModal.querySelector(".playerName").value;
                localStorage.setItem("currentUser",currentUser)
                exitFlag = true;
            });
            //////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////
        } //after}//after input should leave to main menue	
        if (z % 10 == 0) {
            drawBlocks();
            char1.draw();
            if (alphabet_index == 9) {
                tex_string = ''
            }
            if (alphabet_index > 8) {
                if (alphabet_index == 18) {
                    alphabet_index = 0;
                    tex_string = ''
                }
                context.fillStyle = gradient2;
                console.log(alphabet_index % 9)
                tex_string += tex[alphabet_index % 9]
                context.fillText(tex_string, (canvas.width - tex_width) / 2, 250);
                alphabet_index += 1;
            } else {
                context.fillStyle = gradient;
                tex_string += tex[alphabet_index]
                context.fillText(tex_string, (canvas.width - tex_width) / 2, 250);
                alphabet_index += 1;
            }

        }
        z += 1
    }

    if (exitFlag) {
        cancelAnimationFrame(myanim)
		cancelAnimationFrame(mainLoop)
        window.location.href = "../start screen/intro.html";
    } else {
        myanim = requestAnimationFrame(mainLoop);
        currentScore=moveScreenCounter*levelScore
    }
}

cancelAnimationFrame(mainLoop)

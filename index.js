let inputDir ={x:0,y:0};
let foodSound= new Audio('food.mp3');
let gameoverSound =new Audio('gameover.mp3');
let moveSound=new Audio('move.mp3');
let musicSound=new Audio('music.mp3');
let speed=8;
let Score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:9 ,y:11}
]
food={x:6,y:7};
let board = document.querySelector('#board');
const Scorebox = document.querySelector('#scorebox');


//game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
   
}
function isCollide(snake){
    //IF YOU BUMP INTO YOURSELF 
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x&& snake[i].y===snake[0].y){
            return true;
        }
    }
    // IF YOU BUMP INTO THE WALL: 
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 ||snake[0].y<=0){ 
            return true;
        }
    
}
function gameEngine(){
    if(isCollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir ={x:0,y:0};
        alert("Game Over. Press Any Key To Play Again !");
        snakeArr=[ {x:9 ,y:11}];
        musicSound.play();
        Score=0;

    }
    // IF YOU HAVE EATEN THE FOOD , INCREMENT THE SCORE AND REGENERATE THE FOOD
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        Score+=1;
        Scorebox.innerHTML="score: " + Score;
        if(Score>hiscoreval){
            hiscoreval=Score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML="Hiscore " + hiscoreval;

        }
        snakeArr.unshift({x : snakeArr[0].x+inputDir.x,y : snakeArr[0].y+inputDir.y})
       
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    //MOVING THE SNAKE

    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //DISPLAY THE FOOD
    let foodElement = document.createElement('div');
        foodElement.style.gridRowStart= food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


}



//game logic
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
   let hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="Hiscore"+hiscore;

}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the game
    musicSound.play();
    moveSound.play();
    switch(e.key){
        case"ArrowUp":
        console.log("ArrowUp");
        inputDir.x=0;
        inputDir.y=-1;
        break;

        case"ArrowDown":
        console.log("ArrowDown;")
        inputDir.x=0;
        inputDir.y=1;
        break;

        case"ArrowLeft":
        console.log("ArrowLeft;")
        inputDir.x=-1;
        inputDir.y=0;
        break;

        case"ArrowRight":
        console.log("ArrowRigh;t")
        inputDir.x=1;
        inputDir.y=0;
        break;
        default:
            break;
    }
})
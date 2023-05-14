
var canvasvar = document.querySelector('canvas');


    
canvasvar.width = window.innerWidth;
canvasvar.height = window.innerHeight;

const ctx = canvasvar.getContext('2d');
let score = 0;
let gameframe = 0;
let game = false;

ctx.font = '5vh Arial';

let canvas_coordinate = canvasvar.getBoundingClientRect();
const mouse = {
    x: canvasvar.width/2,
    y: canvasvar.width/2,
    click: false
}

canvasvar.addEventListener('mousedown', function(event){
mouse.click= true;    
mouse.x=event.x-canvas_coordinate.x;
mouse.y=event.y-canvas_coordinate.y;
console.log(mouse.x);
console.log(mouse.y);
});

canvasvar.addEventListener('mouseup',function(event){
    mouse.click= false;
});


class monster{
    constructor(){
        this.x = canvasvar.width;
        this.y = canvasvar.height/2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 205;
        this.spriteHeight = 176;
    }


update(){
    const dx= this.x-mouse.x;
    const dy=this.y-mouse.y;
    if(mouse.x != this.x){
        this.x -=dx/30;
    }
    if(mouse.y != this.y){
        this.y -=dy/30;
    }


}

draw(){
   
    ctx.fillStyle= "green";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
   
}
}
const player = new monster();

const bubblearray = [];
class bubble{
    constructor(){
        this.x= Math.random()*canvasvar.width;
        this.y= canvasvar.height+100+Math.random()*canvasvar.height;
        this.radius = 50;
        this.speed = Math.random()*5 + 1;
        this.distance;
        this.counted = false;
        this.sound = "sound1";
    }
    update(){
        this.y -= this.speed;
        const dx= this.x-player.x;
        const dy= this.y-player.y;
        this.distance=Math.sqrt(dx*dx+dy*dy);
    }
    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke;
    }
}



function handlebubble(){
    if(gameframe % 50 == 0){
        bubblearray.push(new bubble());
        console.log(bubblearray.length);
    }
    for(i=0;i<bubblearray.length;i++){
bubblearray[i].update();
bubblearray[i].draw();
    }
    for(i=0;i<bubblearray.length;i++){
        if(bubblearray[i].y<0-bubblearray[i].radius*2){
            bubblearray.splice(i,1);
        }
        if(bubblearray[i].distance< bubblearray[i].radius+player.radius){
            (console.log("collision"));
            if(!bubblearray[i].counted){
           
                score++;
                bubblearray[i].counted = true;
                bubblearray.splice(i,1); 
            }
        }
    }
}



const enemyarray = [];
class enemy{
    constructor(){
        this.x= Math.random()*canvasvar.width;
        this.y= canvasvar.height+100+Math.random()*canvasvar.height;
        this.radius = 60;
        this.speed = Math.random()*5 + 1;
        this.distance;
        this.counted = false;
        this.sound = "sound1";
    }
    update(){
        this.y -= this.speed;
        const dx= this.x-player.x;
        const dy= this.y-player.y;
        this.distance=Math.sqrt(dx*dx+dy*dy);
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke;
    }
}


function handleenemy(){
    if(gameframe % 50 == 0){
        enemyarray.push(new enemy());
        console.log(enemyarray.length);
    }
    for(i=0;i<enemyarray.length;i++){

enemyarray[i].draw();
enemyarray[i].update();
    }
    for(i=0;i<enemyarray.length;i++){
        if(enemyarray[i].y<0-enemyarray[i].radius*2){
            enemyarray.splice(i,1);
        }
        if(enemyarray[i].distance< enemyarray[i].radius+player.radius){
            (console.log("collision"));
            if(!enemyarray[i].counted){
            //     if(enemyarray[i].sound=='sound1'){
            //     collisionsound.play();
            //     console.log("sound function called");
            // }
                gameover();
                enemyarray[i].counted = true;
                enemyarray.splice(i,1); 
            }
        }
    }
}

function gameover(){
    ctx.fillStyle='white';
    ctx.fillText('GAME OVER',canvasvar.width/2.5,canvasvar.height/2);
    game = true;
}


function animate(){
    ctx.clearRect(0,0,canvasvar.width,canvasvar.height)
    
    
    handlebubble();
    
    player.update();
    player.draw();
    handleenemy();
    gameframe++;
    ctx.fillStyle='white';
   ctx.fillText('Score: '+ score, 10, 50)
    
    if(!game) requestAnimationFrame(animate);
}
animate();


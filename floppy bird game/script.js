var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d');

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';

var fly = new Audio();
var score = new Audio();

fly.src='sounds/fly.mp3';
score.src='sounds/score.mp3';

var cons = pipeNorth.height+100;
var bx = 80,by = 150;
var gravity = 1;

document.addEventListener("keydown", function(e){
    if (e.which == 32){
        by -= 25;
        fly.play();
    }
});

function down(e){
    by -= 25;
    fly.play();
    alert(e);
}

var pipe = [];
var sum = 0;

pipe[0] = {
    x : canvas.width,
    y : 0,
}

function draw(){

    ctx.drawImage(bg,0,0);

    for(i=0;i<pipe.length;i++){

        ctx.drawImage(pipeNorth,pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x, pipe[i].y + cons);

        pipe[i].x --;


        if(pipe[i].x == 50){
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
            });
        }

        if( bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+cons) || by + bird.height >=  canvas.height - fg.height){
            alert('Gameover and your score is '+sum);
            location.reload(); // reload the page
        }

        if(pipe[i].x == 75){
            sum++;
            score.play();
        }

    }

    ctx.drawImage(bird,bx,by);

    ctx.drawImage(fg,0,canvas.height-fg.height);

    by += gravity;

    ctx.fillStyle = "#000";
    ctx.style = "500px";
    ctx.fillText("Score "+sum, 10, canvas.height-20);


    requestAnimationFrame(draw);

}

draw();
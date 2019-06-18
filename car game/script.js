var can = document.getElementById('road');
var cts = can.getContext('2d');

var road = new Image();
var line1 = new Image();
line1.src = 'line.png';
var line2 = new Image();
line2.src = 'line.png';
var line3 = new Image();
line3.src = 'line.png';
road.src = 'road.png';
var car = new Image();
car.src = 'car.png';

var i = 0;
var cx = 150;
var cy = 480;

var enemy1 = new Image();
enemy1.src = 's2.png';


var line_height1 = 0;
var line_height2 = line1.height + 60;
var line_height3 = line1.height + line2.height + 120;


document.addEventListener("keydown", function(e){
    if (e.which == 37){
        if( (cx-10) > 0){
            cx = cx-10;
        }
    }
    
    if (e.which == 39){
        if( (cx+10) < (road.width - car.width)){
            cx = cx+10;
        }
    }
});

var mov  = 0;
var arr = [];
arr[0] = {
    x : 20,
    y : -enemy1.height,
}



var score = 0;

function draw(){


    cts.drawImage(road,0,0);

    cts.drawImage(line1,200,line_height1);
    cts.drawImage(line2,200,line_height2);
    cts.drawImage(line3,200,line_height3);

    for(i=0;i<arr.length;i++){

        cts.drawImage(enemy1, arr[i].x, arr[i].y);

        arr[i].y += 2;

        if(arr[i].y == 350){
            arr.push({
                x : Math.floor(Math.random() * ((road.width-enemy1.width)-0+1)+0) ,
                y : -enemy1.height,
            });
        }

        if(((cx+car.width) > arr[i].x) && ( cx < (arr[i].x + enemy1.width ) ) &&  arr[i].y > 490-car.height && arr[i].y < 490+car.height  ){
            alert('Game over');
            location.reload();
        }

        if(arr[i].y == cy+car.height){
            score += 1;
        }
        

    }
    cts.drawImage(car,cx,cy);


    line_height1 += 3;
    line_height2 += 3;
    line_height3 += 3;


    if(line_height1 == road.height){
        line_height1 = -line1.height;
    }
    if(line_height2 == road.height){
        line_height2 = -line2.height;
    }
    if(line_height3 == road.height){
        line_height3 = -line3.height;
    }


    var sc = document.getElementById('score');
    sc.innerHTML = score;
    
    requestAnimationFrame(draw);
}

draw();

/* collision top - arr[i].y == 480-car.height*/
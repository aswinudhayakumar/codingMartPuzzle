$(function(){

var container = $('.container');
var paddle1 = $('.paddle1');
var paddle2 = $('.paddle2');
var paddle_width = parseInt(paddle1.css('width'));
var container_width = parseInt(container.css('width'));
var ball = $('.ball');
var ball_width = parseInt(ball.css('width'));
var move_left = false;
var move_right = false;
var move_left1 = false;
var move_right1 = false;
var movement = 'down';
var ball_angle = 0;

function left() {
    if (parseInt(paddle2.css('left')) > 0) {
        paddle2.css('left', parseInt(paddle2.css('left')) - 15);
        move_left = requestAnimationFrame(left);
    }
}

function right() {
    if (parseInt(paddle2.css('left')) < (container_width - paddle_width)) {
        paddle2.css('left', parseInt(paddle2.css('left')) + 15);
        move_right = requestAnimationFrame(right);
    }
}

function left1() {
    if (parseInt(paddle1.css('left')) > 0) {
        paddle1.css('left', parseInt(paddle1.css('left')) - 15);
        move_left1 = requestAnimationFrame(left1);
    }
}

function right1() {
    if (parseInt(paddle1.css('left')) < (container_width - paddle_width)) {
        paddle1.css('left', parseInt(paddle1.css('left')) + 15);
        move_right1 = requestAnimationFrame(right1);
    }
}

function down(){
    ball.css('top', parseInt(ball.css('top'))+ 5 );
    if(left_right == 'right'){
        ball.css('left', parseInt(ball.css('left'))+ left_right_angle );
    }
    else{
        ball.css('left', parseInt(ball.css('left'))- left_right_angle );
    }
}
function up(){
    ball.css('top', parseInt(ball.css('top')) - 5 );
    if(left_right == 'right'){
        ball.css('left', parseInt(ball.css('left'))+ left_right_angle );
    }
    else{
        ball.css('left', parseInt(ball.css('left'))- left_right_angle );
    }
}

var anime_ball = requestAnimationFrame(ballrepeat);
var ballcenter;
var left_right;
var left_right_angle;
var paddle1_center;
var paddle2_center;

function ballrepeat(){


    if(collision(ball, paddle1)){
        ballcenter = parseInt(ball.css('left')) + ball_width/2;
        paddle1_center = parseInt(paddle1.css('left')) + paddle_width/2;
        if(ballcenter > paddle1_center){
            left_right = 'right';
        }
        else{
            left_right = 'left';
        }
        left_right_angle = Math.abs( (paddle1_center - ballcenter) ) / 6 ;
        movement = 'down';
    }
    if(collision(ball, paddle2)){
        ballcenter = parseInt(ball.css('left')) + ball_width/2;
        paddle2_center = parseInt(paddle2.css('left')) + paddle_width/2;
        if(ballcenter > paddle2_center){
            left_right = 'right';
        }
        else{
            left_right = 'left';
        }
        left_right_angle = Math.abs( (paddle2_center - ballcenter) ) / 6 ;
        movement = 'up';
    }

    if( parseInt(ball.css('left')) <= 0 ){
        left_right = 'right';
    }
    if( parseInt(ball.css('left')) > (container_width - ball_width) ){
        left_right = 'left';
    }
    if( parseInt(ball.css('top')) <= 0 ){
        alert('gameover and player 2 wins');
        location.reload();
    }
    if( parseInt(ball.css('top')) >= (parseInt(container.css('height'))) - (parseInt(ball.css('height'))) ){
        alert('gameover and player 1 wins');
        location.reload();
    }

    if(movement == 'down'){
        down();
    }
    else{
        up();
    }

    requestAnimationFrame(ballrepeat);
}

$(document).on('keydown', function (e) {
    var key = e.keyCode;
    if (key === 37 && move_left === false ) {
        move_left = requestAnimationFrame(left);
    } else if (key === 39 && move_right === false ) {
        move_right = requestAnimationFrame(right);
    } else if (key === 65 && move_left1 === false ) {
        move_left1 = requestAnimationFrame(left1);
    } else if (key === 83 && move_right1 === false ) {
        move_right1 = requestAnimationFrame(right1);
    }
});



$(document).on('keyup', function (e) {
    var key = e.keyCode;
    if (key === 37) {
        cancelAnimationFrame(move_left);
        move_left = false;
    } else if (key === 39) {
        cancelAnimationFrame(move_right);
        move_right = false;
    } else if (key === 65) {
        cancelAnimationFrame(move_left1);
        move_left1 = false;
    } else if (key === 83) {
        cancelAnimationFrame(move_right1);
        move_right1 = false;
    }
});

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}


/*$(document).on('keydown', function(e){
    var key = e.keyCode;
    if(key == 65 && (parseInt(paddle1.css('left')) > 0 )){
        paddle1.css('left', parseInt(paddle1.css('left'))-30 ); 
    }
    if(key == 68 && ( parseInt(paddle1.css('left')) < (con_width - pad1_width) ) ){
        paddle1.css('left', parseInt(paddle1.css('left'))+30 );
    }
    if(key == 37 && (parseInt(paddle2.css('left')) > 0 )){
        paddle2.css('left', parseInt(paddle2.css('left'))-30 );
    }
    if(key ==  39 && ( parseInt(paddle2.css('left')) < (con_width - pad1_width) )){
        paddle2.css('left', parseInt(paddle2.css('left'))+30 );
    }
});
*/


});
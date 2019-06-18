$(function(){

    var line1 = $('.line1');
    var line2 = $('.line2');
    var con = $('.container');
    var car = $('.car');
    var car_width = (parseInt(car.css('width')));
    var con_width = (parseInt(con.css('width')));
    var car_height = (parseInt(car.css('height')));
    var con_height = (parseInt(con.css('height')));
    var opp1 = $('.opp1');
    var opp2 = $('.opp2');
    var line_speed = 5;
    var opp_speed = 4;

    			// Added Function
			function collision(obj1, obj2) {
                var x1 = obj1.offset().left;
                var y1 = obj1.offset().top;
                var h1 = obj1.outerHeight(true);
                var w1 = obj1.outerWidth(true);
                var b1 = y1 + h1;
                var r1 = x1 + w1;
                var x2 = obj2.offset().left;
                var y2 = obj2.offset().top;
                var h2 = obj2.outerHeight(true);
                var w2 = obj2.outerWidth(true);
                var b2 = y2 + h2;
                var r2 = x2 + w2;
    
            if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) 
                return false;
            return true;
        }


    $(document).on('keydown', function(e){
        var key = e.keyCode;
        if(key == 37 && (parseInt(car.css('left')) > 0)){
            car.css('left', parseInt(car.css('left'))-10);
        }
        if(key == 39 && ( (parseInt(car.css('left')))  < (con_width - car_width) )){
            car.css('left', parseInt(car.css('left'))+10);
        }
        if(key == 38 && ( (parseInt(car.css('top'))) > 0 )){
            car.css('top', parseInt(car.css('top'))-10);
        }
        if(key == 40 && ( (parseInt(car.css('top'))) <  ( con_height - car_height ) )){
            car.css('top', parseInt(car.css('top'))+10);
        }
    });

    var run = requestAnimationFrame(line);
    var score = 0;
    var board = $('#score');

    function line(){
        
        board.html(score);

        if(score % 5 == 0 && score > 0){
            line_speed += 0.01;
            opp_speed += 0.01;
        }

        if(collision(car, opp1) || collision(car, opp2)){
            alert('Gameover and your final score is '+ score);
            location.reload();
        }

        if(parseInt(line1.css('top')) > parseInt( con.css('height'))){
            line1.css('top', -300);
        }
        line1.css('top', parseInt(line1.css('top'))+ line_speed );

        if(parseInt(line2.css('top')) > parseInt( con.css('height'))){
            line2.css('top', -300);
        }
        line2.css('top', parseInt(line2.css('top'))+ line_speed );

        if(parseInt(opp1.css('top')) > parseInt( con.css('height'))){
            score += 1;
            var left = parseInt(Math.random() * (con_width - car_width));
            opp1.css('left', left);
            opp1.css('top', -parseInt(car.css('height')));
        }
        opp1.css('top', parseInt(opp1.css('top'))+ opp_speed);

        if(parseInt(opp2.css('top')) > parseInt( con.css('height'))){
            score += 1;
            var left = parseInt(Math.random() * (con_width - car_width));
            opp2.css('left', left);
            opp2.css('top', -parseInt(car.css('height')));
        }
        opp2.css('top', parseInt(opp2.css('top'))+opp_speed);



        requestAnimationFrame(line);
    }

});

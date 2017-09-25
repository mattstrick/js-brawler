var attack;
var canvas = {
    x: 400,
    y: 400
}
var context;
var draw;
var fighter = {
    x: 100,
    y: 100
};
var sword = {
    isAttacking : false,
    frame: 0
};
var time = new Date();

var init;

init = function () {
    context = document.getElementById('game').getContext('2d');
    console.log(context);
    
    window.onkeypress = function (event) {
        // debugger;
        if (event.key === "d") {
            if (fighter.x < canvas.x) {
                fighter.x += 3;
            } else {
                fighter.x = canvas.x;
            }
        }
        if (event.key === "a") {
            if (fighter.x > 0) {
                fighter.x -= 3;
            } else {
                fighter.x = 0;
            }
        }
        if (event.key === "w") {
            if (fighter.y > 0) {
                fighter.y -= 3;
            } else {
                fighter.y = 0;
            }
        }
        if (event.key === "s") {
            if (fighter.y < canvas.y) {
                fighter.y += 3;
            } else {
                fighter.y = canvas.y;
            }
        }
        if (event.key === " ") {
            attack();
        }
        // console.log("fighter", fighter.x + ', ' + fighter.y );
    };

    window.requestAnimationFrame(draw);
};

draw = function() {
    // console.log("fighter", fighter.x + ', ' + fighter.y );
    console.log('sword', sword.frame);
    context.clearRect(0,0, canvas.y, canvas.x);
    drawCanvas();
    drawFighter();
    drawAttack();
    // attack();



    window.requestAnimationFrame(draw);     
};

drawCanvas = function() {
    context.canvas.height = canvas.y;
    context.canvas.width = canvas.x;
}

drawFighter = function() {
    context.fillStyle = 'blue';
    context.fillRect(fighter.x, fighter.y, 10, 10);
};

drawAttack = function() {
    context.fillStyle = 'grey';
    // if (!sword.isAttacking) {
    //     context.fillRect(fighter.x, fighter.y + 13, 4, 10);
    // } else {
        context.save();
        context.rotate(((2 * Math.PI) / 600) * sword.frame + ((2 * Math.PI) / 600000) * time.getMilliseconds());
        context.translate(0, 8.5);        
        context.fillRect(fighter.x, fighter.y + 13, 4, 10);
        context.restore();
        sword.frame += 1

        if (sword.frame < 6000) {
            sword.frame += 1;
        } else {
            sword.frame = 0;
        }
    // }
    

};

attack = function () {
    if (!sword.isAttacking) {
        sword.isAttacking = true;
    }
};

init();
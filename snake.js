//Settings
var snakeX = 2;
var snakeY = 2;
var height = 20;
var width = 20;
var interval = 80;
var increment = 1;
var score = 1;

//Game Variables
var length = 0;
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; //down -1, up = 0, left = 1, right = 2
var int; //Identifier

//entry point of the game
 function run() {
     init();
     int = setInterval(gameLoop, interval);
 }

 //Initializes the game.
 function init() {
     createMap();
     createSnake();
     createFruit();
 }

//Generates the map for the snake.
function createMap() {
    document.write("<table>");

    //Creates as many rows as height.
    for(var y = 0; y<height; y++) {
        document.write("<tr>");
        for(var x = 0; x<height; x++) {
            if(x == 0 || x == width -1 || y == 0 || y == height -1) {
                //Coordinate system.
                document.write("<td class='wall' id='" + x + "-" + y + "'></td>");
            } else {
                document.write("<td class='blank' id='" + x + "-" + y + "'></td>");
            }
        }
        document.write("</tr>");
    }

    document.write("</table>");
}

function createSnake() {
    set(snakeX, snakeY, "snake");
}

//Getter method for Javascript.
function get(x, y) {
    return document.getElementById(x + "-" + y);
}

function set(x, y, value) {
    if(x != null && y != null) {
        get(x, y).setAttribute("class", value);
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getType(x, y) {
    return get(x, y).getAttribute("class");
}

function createFruit() {
    var found = false;
    //Makes sure length isn't the area of the entire map
    while(!found && length < (width-2)*(height-2)+1) {
        var fruitX = rand(1, width-1);
        var fruitY = rand(1, height-1);
        //Typing = true
        if(getType(fruitX, fruitY) == "blank") {
            found = true;
        }

        set(fruitX, fruitY, "fruit");
        fX = fruitX;
        fY = fruitY;
    }
}

//Waiting for user interaction!
window.addEventListener("keypress", function key() {
    //If key is W set direction up
    var key = event.keyCode;

    //Keycodes for Javascript.
    if(direction != -1 && (key == 119 || key == 87)) {
        direction = 0;
    }
    else if(direction != 0 && (key == 115 || key == 83)) {
        direction = -1;
    }
    else if(direction != 1 && (key == 97 || key == 65)) {
        direction = 2;
    }
    else if(direction != 2 && (key == 100 || key == 68)) {
        direction = 1;
    }

    if(!running) {
        running = true;
    } else if(key == 32) {
        running = false;
    }
});

function gameLoop() {
    if(running && !gameOver) {
        update();
    } else if(gameOver) {
        clearInterval(int);
        //Gives you the ID of the interval to clear it.
    }
}

//Basically the draw loop of Processing.
function update() {
    set(fX, fY, "fruit"); //Makes sure fruit is drawn.
    updateTail(); //Length is accurate before displaying.
    set(tailX[length], tailY[length], "blank"); //Makes the last element blank.

    if(direction == 0) {
        snakeY--;
    } else if(direction == -1) {
        snakeY++;
    } else if(direction == 2) {
        snakeX--;
    } else if(direction == 1) {
        snakeX++;
    }
    set(snakeX, snakeY, "snake");
    for(var i=tailX.length-1; i>= 0; i--) {
        if(snakeX == tailX[i] && snakeY == tailY[i]) {
            gameOver = true;
            break;
        }
    }

    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1) {
        gameOver = true;
    } else if(snakeX == fX && snakeY == fY) {
        score += increment;
        createFruit();
        length += increment;
    }

    document.getElementById("score").innerText = "Score: " + score;
}

//Code just to display the tail.
function updateTail() {
    for(var i=length; i>0; i--) {
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}

run(); //Executes current thread
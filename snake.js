//Settings
var snakeX = 2; //Where the snake head starts.
var snakeY = 2; //Where the snake head starts.
var height = 20; //Number of rows.
var width = 20; //Number of columns.
var interval = 80; //Adjusts how fast the code runs.
var increment = 1; //Adjusts how long the snake becomes from the score.
var score = 1; //Adjusts the total score.

//Game Variables
var length = 0; //Stores the size of the array tailX/tailY should store.
var tailX = [snakeX]; //Stores an array of all the x snake values.
var tailY = [snakeY]; //Stores an array of all the y snake values.
var fX; //FruitX
var fY; //FruitY
var running = false; //Checks whether the Snake Game started or not.
var gameOver = false; //Checks whether the game is over or not.
var direction = -1; //Codes: Down -1, Up = 0, Left = 1, Right = 2
var int; //Identifier

//This is the entry point of the game where it calls init() and sets the time.
 function run() {
     init();
     int = setInterval(gameLoop, interval);
 }

 //Initializes the game by creating the necessary assets.
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
                //Create the walls.
                document.write("<td class='wall' id='" + x + "-" + y + "'></td>");
            } else {
                //Create the blanks. 
                document.write("<td class='blank' id='" + x + "-" + y + "'></td>");
            }
        }
        document.write("</tr>");
    }

    document.write("</table>");
}

//Creates the snake head. This is where player movement will be controlled.
function createSnake() {
    set(snakeX, snakeY, "snake");
}

//Gets what coordinate point the object is.
function get(x, y) {
    return document.getElementById(x + "-" + y);
}

//Sets what the classes' ID should be.
function set(x, y, value) {
    if(x != null && y != null) {
        get(x, y).setAttribute("class", value);
    }
}

//Generates a random number, function format.
function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Gets the current class the ID is.
function getType(x, y) {
    return get(x, y).getAttribute("class");
}

//Creates the fruit on the map.
function createFruit() {
    //Found = checks whether the fruit has been ran over or not.
    var found = false;
    //Makes sure length isn't the area of the entire map.
    while(!found && length < (width-2)*(height-2)+1) {
        //Makes sure the fruit hasn't been found yet and is within the game boundries.
        var fruitX = rand(1, width-1);
        var fruitY = rand(1, height-1);
        //Typing = true

        //Checks whether the fruit has been found or not.
        if(getType(fruitX, fruitY) == "blank") {
            found = true;
        }

        //Sets the table ID to fruit.
        set(fruitX, fruitY, "fruit");
        fX = fruitX; //Sets the fruitX
        fY = fruitY; //Sets the fruitY
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

    //Checks whether it's running or not.
    if(!running) {
        running = true;
    } else if(key == 32) {
        //Space (32) can also pause this beautiful game.
        running = false;
    }
});

//Checks whether the game is running or not.
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

    //Changes the direction between them.
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

    //Checks whether we ran into the tail or not.
    for(var i=tailX.length-1; i>= 0; i--) {
        if(snakeX == tailX[i] && snakeY == tailY[i]) {
            gameOver = true;
            break;
        }
    }

    //Checks whether the snake runs into the walls or not. 
    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1) {
        gameOver = true;
    } else if(snakeX == fX && snakeY == fY) {
        //If our snek boi runs over the fruit, we elongate the snake and add to the score.
        score += increment;
        createFruit();
        length += increment;
    }

    //Sets the ID score's inner text to score + score variable.
    document.getElementById("score").innerText = "Score: " + score;
}

//Code just to display the tail.
function updateTail() {
    for(var i=length; i>0; i--) {
        //I equals the length of the snake and goes down.
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
        //Every interval pushes it down more.
    }
    //SnakeX/Y becames the first of the array.
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}

run(); //Executes current thread
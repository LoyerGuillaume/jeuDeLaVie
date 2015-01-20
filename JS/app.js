
var GRID_WIDTH = 50;
var GRID_HEIGHT = 100;

var CELL_WIDTH = 20;
var CELL_HEIGHT = 20;

var grid = [];

$(init);

function init(){

	createGrid();

	cellListener();

	$("body").keydown(function(event){
		/*console.log(event.which);*/
		if(event.which == 32){
			gameOn();
		}
	})

}


function createGrid(){
	for (var y = 0; y < GRID_HEIGHT ; y++){
		var line = [];
		for (var x = 0; x < GRID_WIDTH ; x++){
			var lCell = $("<div class='cell'></div>");
			lCell.css({"top" : x * CELL_HEIGHT+"px" , "left" : y * CELL_WIDTH +"px" , "width" : CELL_WIDTH , "height" : CELL_HEIGHT});
			lCell.data("x", x);
			lCell.data("y", y);
			$("#screen").append(lCell);
			line.push("0");

		}
	}
}

function cellListener(){
	$(".cell").click(function(){
		$(this).addClass("black");
		grid[$(this).data("y"),$(this).data("x")] = 1;
	})	
}

function gameOn(){
	console.log("ALLO");
	var lCells = $(".black");

	$(".black").each(function(){
		var x = $(this).data("x");
		var y = $(this).data("y");

		setAroundBlack(x,y);

	});
}

function setAroundBlack(x, y){


    if(!grid[y][x] == 1){
    	return;
    }

    setBlack(x-1,y-1);
    setBlack(x  ,y-1);
    setBlack(x+1,y-1);

    setBlack(x-1,y  );
    setBlack(x+1,y  );

    setBlack(x-1,y+1);
    setBlack(x  ,y+1);
    setBlack(x+1,y+1);

}

function setBlack(x,y){

    if (outOfRange(x, y)) {
        return;
    }

    var numBlackAround = 0;
    var lCell = grid[y][x];

    if(outOfRange(x-1, y-1) && grid[y-1][x-1]){
    	numBlackAround++;
    }
    if(outOfRange(x  , y-1) && grid[y-1][x ]){
    	numBlackAround++;
    }
    if(outOfRange(x+1, y-1) && grid[y-1][x+1]){
    	numBlackAround++;
    }

    if(outOfRange(x-1, y ) && grid[y-1][x-1]){
    	numBlackAround++;
    }
    if(outOfRange(x+1, y ) && grid[y-1][x-1]){
    	numBlackAround++;
    }

    if(outOfRange(x-1, y+1) && grid[y+1][x-1]){
    	numBlackAround++;
    }
    if(outOfRange(x  , y+1) && grid[y+1][x  ]){
    	numBlackAround++;
    }
    if(outOfRange(x+1, y+1) && grid[y+1][x+1]){
    	numBlackAround++;
    }

    if(lCell.hasClass("black") && numBlackAround != 3 && numBlackAround != 2){
    	grid[y][x] = 0;
    	lCell.removeClass("black");
    	
    }
    else {
    	if(numBlackAround == 3){
    		grid[y][x] = 1;
    		lCell.addClass("black");
    	}
    }



}


function outOfRange(x, y) {
    return x < 0 || x >= CELL_WIDTH || y < 0 || y >= CELL_HEIGHT;
}

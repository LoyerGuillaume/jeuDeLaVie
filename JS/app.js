
var GRID_WIDTH = 100;
var GRID_HEIGHT = 50;

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
			lCell.css({"left" : x * CELL_HEIGHT+"px" , "top" : y * CELL_WIDTH +"px" , "width" : CELL_WIDTH , "height" : CELL_HEIGHT});
			lCell.data("x", x);
			lCell.data("y", y);
			lCell.data("test", false);
			lCell.data("isBlack", false);
			$("#screen").append(lCell);
			line.push(lCell);

		}
		grid.push(line);
	}
}

function cellListener(){
	$(".cell").click(function(){
		$(this).addClass("black");
		$(this).data("isBlack", true);
		/*grid[$(this).data("y"),$(this).data("x")] = 1;*/
	})	
}

function gameOn(){
	var lCells = $(".black");

	$(".cell").each(function(){
		var x = $(this).data("x");
		var y = $(this).data("y");

		setAroundBlack(x,y);

	});
	setReinitData();
/*	setIsBlackTrue();
	setTestFalse();*/
}

function setAroundBlack(x, y){


    if(!grid[y][x].hasClass("black")){
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
    var lCell = grid[y][x];

    if(lCell.data("test")){
    	return;
    }

    var numBlackAround = 0;

    if(!outOfRange(x-1, y-1) && grid[y-1][x-1].data("isBlack")){
    	numBlackAround++;
    }
    if(!outOfRange(x  , y-1) && grid[y-1][x ].data("isBlack")){
    	numBlackAround++;
    }
    if(!outOfRange(x+1, y-1) && grid[y-1][x+1].data("isBlack")){
    	numBlackAround++;
    }

    if(!outOfRange(x-1, y ) && grid[y  ][x-1].data("isBlack")){
    	numBlackAround++;
    }
    if(!outOfRange(x+1, y ) && grid[y  ][x+1].data("isBlack")){
    	numBlackAround++;
    }

    if(!outOfRange(x-1, y+1) && grid[y+1][x-1].data("isBlack")){
    	numBlackAround++;
    }
    if(!outOfRange(x  , y+1) && grid[y+1][x  ].data("isBlack")){
    	numBlackAround++;
    }
    if(!outOfRange(x+1, y+1) && grid[y+1][x+1].data("isBlack")){
    	numBlackAround++;
    }



    if(lCell.hasClass("black") && numBlackAround != 3 && numBlackAround != 2){
    	/*grid[y][x] = 0;*/
    	lCell.removeClass("black");
    	
    }
    else {
    	if(numBlackAround == 3){
    		/*grid[y][x] = 1;*/
    		lCell.addClass("black");
    	}
    }

    lCell.data("test", true);



}

/*function getJQueryCell(pX, pY){
	var lCell = null;
	$(".cell").each(function(){
		var x = $(this).data("x");
		var y = $(this).data("y");

		if((x == pX )&&( y == pY))
		{
			lCell = $(this);
		}

	});
	
	return lCell;

}*/


function outOfRange(x, y) {
    return x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT;
}

/*function setIsBlackTrue(){
	$(".black").data("isBlack", true);
}
function setTestFalse(){
	$(".cell").data("test", false);
}*/

function setReinitData(){

	$(".cell").each(function(){
		if($(this).hasClass("black")){
			$(this).data("isBlack", true);
		}
		else{
			$(this).data("isBlack", false);	
		}
		$(this).data("test", false);

	});
}

var GRID_WIDTH = 55;
var GRID_HEIGHT = 30;

var CELL_WIDTH = 15;
var CELL_HEIGHT = 15;

var play = false;
var delayPlay = 50;

var grid = [];

$(init);

function init(){
	$("#screenJeuDeLaVie").css("height", GRID_HEIGHT * CELL_HEIGHT + "px").css("width", GRID_WIDTH * CELL_WIDTH + "px");
	createGrid();

	cellListener();
	buttonListeners()
	
}

function buttonListeners(){
/*	$("#oneEtape").click(function(event){
		gameOn();
	});
	$("body").on("click","#play", function(event){
		play = true;
		setTimeout(playGame, delayPlay);
		$("#play").html("Stop");
		$("#play").attr("id", "stop");
	});
	$("body").on("click","#stop", function(event){
		play = false;
		$("#stop").html("Play");
		$("#stop").attr("id", "play");
	});
	$("body").on("click","#reset", function(event){
		resetGrid();
		setReinitData();
	});

	$("#star").click(function(event){
		resetGrid()
		setReinitData();
		setForm(star, "mid");
	});

	$("#canon").click(function(event){
		resetGrid()
		setReinitData();
		setForm(canon, "top");
	});*/

	
	$("body").keydown(function(event){
		console.log(event.which);
		if(event.which == 32){
			if(!play){
				play = true;
				setTimeout(playGame, delayPlay);
			} else{
				play = false;
			}
		}
	})

}

function playGame(){
	if(play){
		gameOn();
		setTimeout(playGame, delayPlay);
	}
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
			$("#screenJeuDeLaVie").append(lCell);
			line.push(lCell);

		}
		grid.push(line);
	}
}

function cellListener(){
	$(".cell").click(function(){
		if($(this).hasClass("black"))
		{
			$(this).removeClass("black");
			$(this).data("isBlack", false);	
		}
		else
		{
			$(this).addClass("black");
			$(this).data("isBlack", true);
		}
		/*grid[$(this).data("y"),$(this).data("x")] = 1;*/
	})	
}

function gameOn(){
	var lCells = $(".black");
	setReinitData();

	$(".cell").each(function(){
		var x = $(this).data("x");
		var y = $(this).data("y");

		setAroundBlack(x,y);

	});
/*	setIsBlackTrue();
	setTestFalse();*/
}

function setAroundBlack(x, y){


    if(!grid[y][x].data("isBlack")){
    	return;
    }

    setBlack(x-1,y-1);
    setBlack(x  ,y-1);
    setBlack(x+1,y-1);

    setBlack(x-1,y  );
    setBlack(x ,y  );
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
};

function resetGrid(){
	$(".cell").each(function(){
		if($(this).hasClass("black")){
			$(this).removeClass("black");
		}

	});

}

function setForm(gridForm, position){
	if(position == "mid"){
		var midY = Math.floor(GRID_HEIGHT/2) - Math.floor(gridForm.length/2);
	}
	else{
		var midY = 0;
	}

	for(var i = 0; i < gridForm.length ; i++){

		if(position == "mid"){
			var midX = Math.floor(GRID_WIDTH/2) - Math.floor(gridForm[i].length/2);
		}
		else{
			var midX = 0;
		}
		for(var j = 0; j< gridForm[i].length ; j++){
			if(gridForm[i][j] == 1){
				$(grid[i+midY][j+midX]).data("isBlack", true);
				$(grid[i+midY][j+midX]).addClass("black");
			}

		}
	}
}
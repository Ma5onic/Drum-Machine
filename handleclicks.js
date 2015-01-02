//mousedown/up when reached end

$('#canvas').mousedown(function (e) {
    var clickedX = e.pageX 
    var clickedY = e.pageY 
    
    intClickX = parseInt(clickedX/width*16)
    intClickY = parseInt(clickedY/height*5)
    if (data[intClickX][intClickY]==0){
    data[intClickX][intClickY]=1
	}
	else
	{data[intClickX][intClickY]=0}	


    drawpattern();
    // grid.rectfill(context, (width/16)*intClickX, ((height/5)*intClickY), width/16, (height/5), 0,0,"rgb(0,0,0)");
    
});

$('#controls').mousedown(function (e) {
	play();
});

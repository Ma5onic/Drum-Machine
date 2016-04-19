//mousedown/up when reached end

$('#canvas').mousedown(function (e) {
    var clickedX = e.pageX - $("#canvas").offset().left
    var clickedY = e.pageY - $("#canvas").offset().top
    
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
	if (isPlaying){
	controlscontext.clearRect(0,0,controls.width,controls.height)
	controlscontext.fillStyle=("rgba(0,0,0,1)")
	controlscontext.fillRect(0,0,controls.width,controls.height)
	}
	else
	{
	controlscontext.clearRect(0,0,controls.width,controls.height)
	controlscontext.fillStyle=("rgba(0,0,0,0.5)")
	controlscontext.fillRect(0,0,controls.width,controls.height)		
	};
});

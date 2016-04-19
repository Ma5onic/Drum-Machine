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

var sampBuffers = [];

loadFiles("KIT1")
function loadFiles(url){
for(var i=4;i>=0;i--){
	switch (i){
		case 0:
		loadSound(url+"/tom/0.wav")
		case 1:
		loadSound(url+"/click/0.wav")
		case 2:
		loadSound(url+"/hat/0.wav")
		case 3:
		loadSound(url+"/snare/0.wav")
		case 4:
		loadSound(url+"/kick/0.wav")
	}
}
}


function changeFunc() {
var selectBox = document.getElementById("s1");
var selectedValue = selectBox.options[selectBox.selectedIndex].value;
console.log(selectedValue);
}


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

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

	reset_board(width,height);
    drawpattern();
    // reset_board(width,height);
    // grid.rectfill(context, (width/16)*intClickX, ((height/5)*intClickY), width/16, (height/5), 0,0,"rgb(0,0,0)");
    
});

function createOptions(selector)
{
    var i;
    for (i=1;i<=5;i++){
      selector.options[i-1] = new Option(i,i);
    }
}
//usage:
createOptions(document.getElementById("s1"));
createOptions(document.getElementById("s2"));
createOptions(document.getElementById("s3"));
createOptions(document.getElementById("s4"));
createOptions(document.getElementById("s5"));


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


function changeFunc(s1) {
	console.log(s1)
	var selectBox;
	var tdr;
	switch (s1){
		case 1:
			selectBox = document.getElementById("s1");
			tdr="tom";
			break;
		case 2:
			selectBox = document.getElementById("s2");
			tdr="click";
			break;
		case 3:
			selectBox = document.getElementById("s3");
			tdr="hat";
			break;	
		case 4:
			tdr="snare";
			selectBox = document.getElementById("s4");
			break;
		case 5:
			tdr="kick";
			selectBox = document.getElementById("s5");
			break;
	}
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	// console.log(selectedValue)
	console.log(tdr)
	console.log(selectedValue)
	loadSound("KIT1/"+tdr+"/"+(selectedValue-1)+".wav",s1-1)
	// console.log(selectedValue);
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

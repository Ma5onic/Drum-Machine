//save board
var data = [16];

for (var i=0;i<16;i++){
	data[i]= [0,0,0,0,0]
}

function drawpattern(){
	for (var i=0;i<16;i++){
		for (var j=0;j<5;j++){
			if (data[i][j]==1)
			{
		 		grid.rectfill(context, (width/16)*i, ((height/5)*j), width/16, (height/5), 0,0,"rgba(0,10,"+(j*40)+",0.3)");
			}
		}
	}
	
}
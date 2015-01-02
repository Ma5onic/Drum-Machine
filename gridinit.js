
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;


	var w = width ,
			h = height ,
			x = 0,
			y = 0;

	// colorMinMaj();
	// square();
	// rect();
	// isometric();
	// dimetric();
	// isodimetric();
	// hex();
	// polar();
	// dots();
	// hexDots();
	// plus();
	// celtic();
	// triangle();
	all();

function reset_board(w,h){
		context.clearRect(0,0,w,h)
			grid.rect(context, x, y, w, h, width/16, height/5, "rgb(0,0,0)");
			
		}

	
function loc(i) {
	
		reset_board(width,height);
		grid.rectfill(context, (width/16)*i, y, width/16, height, "rgb(0,0,0)");
		}



	function colorMinMaj() {
		grid.majorStrokeStyle = "blue";
		grid.minorStrokeStyle = "red";
		grid.thirdStrokeStyle = "green";

		grid.majorFillStyle = "blue";
		grid.minorFillStyle = "red";	
	}

	function rect() {
		grid.rect(context, 0, 0, width, height, 50, 25);
	}




	function all() {
	
		grid.rect(context, x, y, w, h, width/16, height/5, "rgb(0,0,0)");
	

	}


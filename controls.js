	var controls = document.getElementById("controls"),
		controlscontext = controls.getContext("2d");

		controls.width = window.innerWidth-30,
		controls.height = window.innerHeight/3;
controlscontext.fillStyle=("rgba(0,0,0,0.5)")
controlscontext.fillRect(0,0,controls.width,controls.height);
(function() {
	var grid = {
		thirdLineWidth: 0.2,
		thirdStrokeStyle: "black",
		
		minorLineWidth: 0.25,
		minorStrokeStyle: "black",
		minorDotSize: 1,
		minorFillStyle: "black",
		
		majorLineWidth: 0.5,
		majorStrokeStyle: "black",
		majorDotSize: 2,
		majorFillStyle: "black",



		

		rect: function(context, x, y, w, h, resx, resy, color) {
			this._predraw(context);
			context.beginPath();
			this._useMajor(context);
			for(i = x; i <= x + w; i += resx) {
				context.moveTo(i, y);
				context.lineTo(i, y + h);
			}
			for(i = y; i <= y + h; i += resy) {
				context.moveTo(x, i);
				context.lineTo(x + w, i);
			}
			context.strokeStyle = color;

			context.stroke();
			//context.fill();
			this._postDraw(context);
		},

		rectfill: function(context, x, y, w, h, resx, resy, color) {
			context.rect(x,y,w,h);
			context.fillStyle = color;

			context.fill();
			//context.fill();
			this._postDraw(context);
		},



		_predraw: function(context) {
			context.save();
			context.translate(-0.5, -0.5);
			this._useMajor(context);
		},

		_postDraw: function(context) {
			context.restore();
		},

		_useThird: function(context) {
			context.lineWidth = this.thirdLineWidth;
			context.strokeStyle = this.thirdStrokeStyle;
		},

		_useMinor: function(context) {
			context.lineWidth = this.minorLineWidth;
			context.strokeStyle = this.minorStrokeStyle;
			context.fillStyle = this.minorFillStyle;
		},

		_useMajor: function(context) {
			context.lineWidth = this.majorLineWidth;
			context.strokeStyle = this.majorStrokeStyle;
			context.fillStyle = this.majorFillStyle;
		}

	}


	if (typeof define === "function" && define.amd) {
	    define(grid);
	} else {
	   window.grid = grid;
	}

}());

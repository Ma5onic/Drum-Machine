$('#canvas').click(function (e) {
    var clickedX = e.pageX 
    var clickedY = e.pageY 
    
    intClickX = parseInt(clickedX/width*16)
    intClickY = parseInt(clickedY/height*5)
    alert(intClickX)
});
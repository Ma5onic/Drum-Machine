//buffer for click
// var sampBuffers = [];

// loadFiles("KIT1")
// function loadFiles(url){
// for(var i=0;i<5;i++){
// loadSound(url+"/"+i+".wav")
// }
// }




function loadSound(url, i) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    if (i==undefined){
        console.log('waza')
        request.onload = function() {
            audioContext.decodeAudioData(request.response, function(buffer) {
                if (sampBuffers.length<6){
                sampBuffers.push(buffer);
                }
            });
        }
        request.send();
    }
    else
    {
        request.onload = function() {
            audioContext.decodeAudioData(request.response, function(buffer) {
               sampBuffers[4-i] = buffer
            });
        }
        request.send();
    }
}

playback = parseFloat($("#speed").val());
gain = parseFloat($("#gain").val());

/** playSound -
 self explanitory 
 */
function playSound(buffer, time, notelength) {
    var source = audioContext.createBufferSource(); // creates a sound source
    source.buffer = buffer;
    var gainNode = audioContext.createGain();
    gainNode.gain.value = gain;
    source.connect(gainNode);
    // tell the source which sound to play
    gainNode.connect(audioContext.destination);
    source.playbackRate.value = playback // connect the source to the audioContext's destination (the speakers)
    source.start(time); // play the source now
    source.stop(time+notelength)

    // note: on older systems, may have to use deprecated noteOn(time);
}
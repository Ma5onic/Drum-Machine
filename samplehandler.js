//buffer for click
var clickBuffer = null;

function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
        audioContext.decodeAudioData(request.response, function(buffer) {
            clickBuffer = buffer;
        });
    }
    request.send();
}



/** playSound -
 self explanitory 
 */
function playSound(buffer) {
    var source = audioContext.createBufferSource(); // creates a sound source
    source.buffer = buffer;
    var gainNode = audioContext.createGain();
    gainNode.gain.value = 1;
    source.connect(gainNode);
    // tell the source which sound to play
    gainNode.connect(audioContext.destination); // connect the source to the audioContext's destination (the speakers)
    source.start(0); // play the source now
    // note: on older systems, may have to use deprecated noteOn(time);
}
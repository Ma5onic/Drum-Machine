//initialize audio context
var buflen = 2048;
var buf = new Uint8Array(buflen);

function init(yinSampleRate, yinBufferSize){
	bufferSize = yinBufferSize;
	sampleRate = yinSampleRate;
	halfBufferSize = bufferSize / 2;
	threshold = 0.10;
	probability = 10.0;
	//initialize array and set it to zero
	yinBuffer = [halfBufferSize];
	for(i = 0; i < halfBufferSize; i++){
		yinBuffer[i] = 0;
	}
}


window.AudioContext = window.AudioContext || window.webkitAudioContext;
audioContext = new AudioContext();

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    // Connect it to the destination to hear yourself (or any other node for processing!)
    // gainNode = audioContext.createGainNode();
    //  mediaStreamSource.connect( audioContext.destination );

    setupAudioNodes();


    // when the javascript node is called
    // we use information from the analyzer node
    // to draw the volume

    javascriptNode.onaudioprocess = function() {

        // get the average for the first channel
        var array = new Uint8Array(analyser.frequencyBinCount);

        //analyser
        analyser.getByteFrequencyData(array);

        //where we set mainarraypointer
        mainarraypointer = array;

     

        

        }
    




    function setupAudioNodes() {

        // setup a javascript node
        javascriptNode = audioContext.createScriptProcessor(8192, 1, 1);
        // connect to destination, else it isn't called
        javascriptNode.connect(audioContext.destination);

        // setup a analyzer
        analyser = audioContext.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 2048;

        analyser2 = audioContext.createAnalyser();
        analyser2.smoothingTimeConstant = 0.0;
        analyser2.fftSize = 2048;

        // create a buffer source node
        sourceNode = audioContext.createBufferSource();
        splitter = audioContext.createChannelSplitter();

        // connect the source to the analyser and the splitter
        mediaStreamSource.connect(splitter);

        // connect one of the outputs from the splitter to
        // the analyser
        splitter.connect(analyser, 0, 0);
        splitter.connect(analyser2, 1, 0);

        // we use the javascript node to draw at a
        // specific interval.
        analyser.connect(javascriptNode);

        // and connect to destination
        sourceNode.connect(audioContext.destination);

    }


    //setInterval(function(){record(toNoteName(noteFromPitch(currentPitch)),octave)},250);




}

//initialize
init(44100, buf.length)

function updatePitch(time) {
    analyser.getByteTimeDomainData(buf);
}



// when the javascript node is called
// we use information from the analyzer node
// to draw the volume
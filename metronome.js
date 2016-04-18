/** taken and modded from cwilso web audio metronome
https://github.com/cwilso/metronome
*/
var bpm = 120;
var audioContext = null;

var isPlaying = false;      // Are we currently playing?
var startTime;              // The start time of the entire sequence.
var current16thNote;        // What note is currently last scheduled?
var tempo = bpm;         // tempo (in beats per minute)
var lookahead = 25.0;       // How frequently to call scheduling function 
                            //(in milliseconds)
var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                            // This is calculated from lookahead, and overlaps 
                            // with next interval (in case the timer is late)
var nextNoteTime = 0.0;     // when the next note is due.
var noteResolution = 2;     // 0 == 16th, 1 == 8th, 2 == quarter note
var noteLength = 0.5;      // length of "beep" (in seconds)
var timerID = 0;            // setInterval identifier.
var last16thNoteDrawn = -1; // the last "box" we drew on the screen
var notesInQueue = [];      // the notes that have been put into the web audio,
                            // and may or may not have played yet. {note, time}
var timerWorker = null;     // The Web Worker used to fire timer messages

function nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / bpm;    // Notice this picks up the CURRENT 
                                          // tempo value to calculate beat length.
    nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    current16thNote++;    // Advance the beat number, wrap to zero
    if (current16thNote == 16) {
        current16thNote = 0;
    }
}

/** accuratedata -
records the 128 ticks per beat pitch and volume data
*/


function scheduleNote( beatNumber, time ) {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push( { note: beatNumber, time: time } );


    // create an oscillator

   console.log(time)
   if (data[beatNumber][4]==1){
    playSound(sampBuffers[0], time, noteLength)
   }
   if (data[beatNumber][3]==1){
    playSound(sampBuffers[1], time, noteLength)
   }
      if (data[beatNumber][2]==1){
    playSound(sampBuffers[2], time, noteLength)
   }

    if (data[beatNumber][1]==1){
    playSound(sampBuffers[3], time, noteLength)
   }

   if (data[beatNumber][0]==1){
    playSound(sampBuffers[4], time, noteLength)
   }


   loc(beatNumber);



}



function scheduler() {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    console.log(nextNoteTime)
    console.log(audioContext.currentTime+scheduleAheadTime)
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
      
        scheduleNote( current16thNote, nextNoteTime );
        nextNote();
       
    }
}

function play() {
    isPlaying = !isPlaying;

    if (isPlaying) { // start playing
        current16thNote = 0;
        nextNoteTime = audioContext.currentTime;
        timerWorker.postMessage("start");
        return "stop";
    } else {
        timerWorker.postMessage("stop");
        return "play";
    }
}
function resetCanvas (e) {
    // resize the canvas - but remember - this clears the canvas too.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //make sure we scroll to the top left.
    window.scrollTo(0,0); 
}




function init(){
    var container = document.createElement( 'div' );

    container.className = "container";
    canvas = document.createElement( 'canvas' );
    canvasContext = canvas.getContext( '2d' );
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    document.body.appendChild( container );
    container.appendChild(canvas);    
    canvasContext.strokeStyle = "#ffffff";
    canvasContext.lineWidth = 2;

    // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
    // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
    // TO WORK ON CURRENT CHROME!!  But this means our code can be properly
    // spec-compliant, and work on Chrome, Safari and Firefox.

    audioContext = new AudioContext();

    // if we wanted to load audio files, etc., this is where we should do it.

    window.onorientationchange = resetCanvas;
    window.onresize = resetCanvas;

    // requestAnimFrame(draw);    // start the drawing loop.

    timerWorker = new Worker("metronomeworker.js");

    timerWorker.onmessage = function(e) {
        if (e.data == "tick") {
            // console.log("tick!");
            scheduler();
        }
        else
            console.log("message: " + e.data);
    };
    timerWorker.postMessage({"interval":lookahead});
}

window.addEventListener("load", init );




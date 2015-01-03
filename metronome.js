/** taken and modded from cwilso web audio metronome
https://github.com/cwilso/metronome
*/
var bpm = 120;


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
var noteLength = 0.05;      // length of "beep" (in seconds)
var timerID = 0;            // setInterval identifier.
var last16thNoteDrawn = -1; // the last "box" we drew on the screen
var notesInQueue = [];      // the notes that have been put into the web audio,
                            // and may or may not have played yet. {note, time}


function nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / bpm;    // Notice this picks up the CURRENT 
                                          // tempo value to calculate beat length.
    nextNoteTime += (0.5/2) * secondsPerBeat;    // Add beat length to last beat time

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

   console.log(beatNumber)
   if (data[beatNumber][4]==1){
    playSound(sampBuffers[0])
   }
   if (data[beatNumber][3]==1){
    playSound(sampBuffers[1])
   }
      if (data[beatNumber][2]==1){
    playSound(sampBuffers[2])
   }

         if (data[beatNumber][1]==1){
    playSound(sampBuffers[3])
   }

         if (data[beatNumber][0]==1){
    playSound(sampBuffers[4])
   }


   loc(beatNumber);

}



function scheduler() {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.

    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
      
        scheduleNote( current16thNote, nextNoteTime );
        nextNote();
       
    }
    timerID = window.setTimeout( scheduler, lookahead );
}

function play() {

    isPlaying = !isPlaying;

    if (isPlaying) { // start playing
     //      i=0

        current16thNote = 0;
        nextNoteTime = audioContext.currentTime;
        scheduler();    // kick off scheduling
       
   
        return "stop";
    } else {
        window.clearTimeout( timerID );
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





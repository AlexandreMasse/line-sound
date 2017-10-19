function Audio() {

    window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

    this.audioCtx = new AudioContext();
    //this.audioBuffer;
    //this.audioSource;
    this.analyser = this.audioCtx.createAnalyser();
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

}

Audio.prototype = {

    loadSound : function(url) {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {

            this.audioCtx.decodeAudioData(request.response, function(buffer) {

                // success callback
                this.audioBuffer = buffer;

                // Create sound from buffer
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = this.audioBuffer;

                // connect the audio source to context's output
                this.audioSource.connect( this.analyser );
                this.analyser.connect( this.audioCtx.destination );

                // play sound
                this.audioSource.start();

                //addListeners();
                //this.frame();

            }.bind(this),
                function(){

                // error callback
                //

            }.bind(this));
        }.bind(this);

        request.send();
    },

    getFrequencyData : function(){

        //rafId = requestAnimationFrame( this.frame );

        this.DELTA_TIME = Date.now() - this.LAST_TIME;
        this.LAST_TIME = Date.now();

        // analyser.getByteFrequencyData(frequencyData);

        this.analyser.getByteFrequencyData(this.frequencyData);
        return this.frequencyData;
    },


}
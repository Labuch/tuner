class AudioContextHandler {

    FREQUENCE_A_4 = 440;
    NUMBER_A_4 = 69;
    BUFFER_SIZE = 2048;
    NOTE_STRINGS = [
        'C',
        'C♯',
        'D',
        'D♯',
        'E',
        'F',
        'F♯',
        'G',
        'G♯',
        'A',
        'A♯',
        'B'
    ];

    initGetUserMedia = function () {
        window.AudioContext = window.AudioContext || window.webkitAudioContext
        if (!window.AudioContext) {
            return alert('AudioContext not supported')
        }

        // Older browsers might not implement mediaDevices at all, so we set an empty object first
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {}
        }

        // Some browsers partially implement mediaDevices. We can't just assign an object
        // with getUserMedia as it would overwrite existing properties.
        // Here, we will just add the getUserMedia property if it's missing.
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
                // First get ahold of the legacy getUserMedia, if present
                const getUserMedia =
                    navigator.webkitGetUserMedia || navigator.mozGetUserMedia

                // Some browsers just don't implement it - return a rejected promise with an error
                // to keep a consistent interface
                if (!getUserMedia) {
                    alert('getUserMedia is not implemented in this browser')
                }

                // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                return new Promise(function (resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject)
                });
            }
        }
    }

    init = () => {
        this.audioContext = new window.AudioContext()
        this.analyser = this.audioContext.createAnalyser()
        this.analyser.fftSize = 2048;
    }

    start = () => {
        const self = this;
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(function (stream) {
                self.audioContext.createMediaStreamSource(stream).connect(self.analyser)
            })
            .catch(function (error) {
                alert(error.name + ': ' + error.message)
            })
        this._interval = setInterval(this.foundFrequency.bind(this), 50);
    }

    stop() {
        clearInterval(this._interval);
    }


    findFundamentalFreq = (buffer, sampleRate) => {

        const size = buffer.length;
        const MAX_SAMPLES = Math.floor(size / 2);

        let bestCorrelation = 0, bestOffset = -1;

        const signal = buffer.reduce((accu, value) => {
            return accu + ((value - 128) * (value - 128));
        }, 0)

        if (Math.sqrt(signal / size) < 1) {
            return -1;
        }


        for (let offset = 1; offset < MAX_SAMPLES; offset++) {
            let correlation = 0;

            for (let i = 0; i < MAX_SAMPLES; i++) {
                correlation += ((buffer[i] - 128) / 128) * ((buffer[i + offset] - 128) / 128);
            }
            correlation = (correlation / MAX_SAMPLES);

            if (correlation > bestCorrelation) {
                bestCorrelation = correlation;
                bestOffset = offset;
            }

            if (correlation > 0.9) {
                break;
            }
        }

        if (bestCorrelation > 0.025 && bestOffset > 1) {
            // The period (in frames) of the fundamental frequency is 'bestK'. Getting the frequency from there is trivial.
            var fundamentalFreq = sampleRate / bestOffset;
            return fundamentalFreq;
        }
        else {
            // We haven't found a good correlation
            return -1;
        }
    }

    foundFrequency = () => {
        var buffer = new Uint8Array(this.BUFFER_SIZE);
        this.analyser.getByteTimeDomainData(buffer);
        const frequency = this.findFundamentalFreq(buffer, this.audioContext.sampleRate);
        const note = this.getNoteNumber(frequency);
        this.onFrequencyFound(
            {
                note: this.getNoteName(note),
                frequency: Math.round(frequency),
                cents: this.getCents(frequency, note),
            });

    }

    getNoteNumber = (frequency) => {
        const note = 12 * (Math.log(frequency / this.FREQUENCE_A_4) / Math.log(2));
        return Math.round(note) + this.NUMBER_A_4;
    }

    getNoteName = (note) => {
        return `${this.NOTE_STRINGS[note % 12]} ${Math.round(note / 12 + 1)}`;
    }

    getStandardFrequency = (note) => {
        return this.FREQUENCE_A_4 * Math.pow(2, (note - this.NUMBER_A_4) / 12);
    }

    getCents = (frequency, note) => {
        return Math.floor(
            (1200 * Math.log(frequency / this.getStandardFrequency(note))) / Math.log(2)
        )
    }
}

export default AudioContextHandler;
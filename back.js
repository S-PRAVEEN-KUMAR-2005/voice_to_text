
document.addEventListener("DOMContentLoaded", function() {
    const startStopBtn = document.getElementById("startStopBtn");
    const transcript = document.getElementById("transcript");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let recognizing = false;

    recognition.onstart = function() {
        recognizing = true;
        startStopBtn.textContent = "Stop Recognition";
    };

    recognition.onerror = function(event) {
        console.error("Recognition error:", event.error);
    };

    recognition.onend = function() {
        recognizing = false;
        startStopBtn.textContent = "Start Recognition";
    };

    recognition.onresult = function(event) {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                transcript.value += event.results[i][0].transcript + ' ';
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
    };

    startStopBtn.addEventListener("click", function() {
        if (recognizing) {
            recognition.stop();
            return;
        }
        transcript.value = '';
        recognition.start();
    });
});

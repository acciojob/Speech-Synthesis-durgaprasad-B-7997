// Your script here.

  <script>
    const synth = window.speechSynthesis;

    const textInput = document.getElementById('text');
    const voiceSelect = document.getElementById('voiceSelect');
    const rate = document.getElementById('rate');
    const pitch = document.getElementById('pitch');
    const rateValue = document.getElementById('rateValue');
    const pitchValue = document.getElementById('pitchValue');
    const speakButton = document.getElementById('speak');
    const stopButton = document.getElementById('stop');

    let voices = [];

    function populateVoices() {
      voices = synth.getVoices();

      voiceSelect.innerHTML = '';

      if (voices.length === 0) {
        const option = document.createElement('option');
        option.textContent = 'No voices available';
        voiceSelect.appendChild(option);
        voiceSelect.disabled = true;
        return;
      }

      voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = index;
        voiceSelect.appendChild(option);
      });

      voiceSelect.disabled = false;
    }

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }

    let utterance;

    function speakText() {
      const text = textInput.value.trim();
      if (!text || voices.length === 0) {
        return;
      }

      // Stop any current speech
      synth.cancel();

      utterance = new SpeechSynthesisUtterance(text);
      const selectedVoice = voices[voiceSelect.value];
      utterance.voice = selectedVoice;
      utterance.rate = parseFloat(rate.value);
      utterance.pitch = parseFloat(pitch.value);

      synth.speak(utterance);
    }

    function stopSpeaking() {
      synth.cancel();
    }

    speakButton.addEventListener('click', speakText);
    stopButton.addEventListener('click', stopSpeaking);

    voiceSelect.addEventListener('change', () => {
      if (synth.speaking) {
        speakText(); // restart with new voice
      }
    });

    rate.addEventListener('input', () => {
      rateValue.textContent = rate.value;
      if (synth.speaking) {
        speakText(); // restart with new rate
      }
    });

    pitch.addEventListener('input', () => {
      pitchValue.textContent = pitch.value;
      if (synth.speaking) {
        speakText(); // restart with new pitch
      }
    });
  </script>
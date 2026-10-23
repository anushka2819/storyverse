// Helper to strip all Unicode emojis, pictographs, symbols, and dingbats
export function stripEmojisForTTS(text) {
  if (!text) return '';
  return text
    // Strip extended pictographics, emoji presentation, symbols, dingbats, arrows, and variation selectors
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}-\u{2B55}\u{FE00}-\u{FE0F}\u{200D}\u{1F1E6}-\u{1F1FF}]/gu, '')
    // Clean up multiple spaces and spaces before punctuation
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .trim();
}

class NarratorService {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.isEnabled = true;
    this.speaking = false;
    this.activeUtterance = null;
    this.fallbackTimeout = null;

    if (this.synth) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  getBestVoice(speaker) {
    if (!this.voices || this.voices.length === 0) return null;

    let preferred = this.voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Karen'))
    );
    return preferred || this.voices[0];
  }

  speak(text, speaker = 'NARRATOR', onEndCallback = null) {
    this.cancel();

    if (!this.synth || !this.isEnabled || !text) {
      if (onEndCallback) onEndCallback();
      return;
    }

    // 1. Clean text by stripping technical prefixes and brackets
    let cleanText = text
      .replace(/^SFX:\s*/gi, '')
      .replace(/^NARRATOR:\s*/gi, '')
      .replace(/^AARAV:\s*/gi, '')
      .replace(/^BOTTLE:\s*/gi, '')
      .replace(/^LILY:\s*/gi, '')
      .replace(/^ROCKY:\s*/gi, '')
      .replace(/^BENNY:\s*/gi, '')
      .replace(/^MILO:\s*/gi, '')
      .replace(/^TOBY:\s*/gi, '')
      .replace(/^HAPPY MEMORY:\s*/gi, '')
      .replace(/\[[^]*?\]/g, '')
      .trim();

    // 2. Strip all emojis so browser speech synthesis does not pronounce emoji names (e.g., "sparkle", "droplet", "star")
    cleanText = stripEmojisForTTS(cleanText);

    if (!cleanText) {
      if (onEndCallback) onEndCallback();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.activeUtterance = utterance; // Prevent Garbage Collection in Chrome/Edge!
    this.speaking = true;

    const voice = this.getBestVoice(speaker);
    if (voice) utterance.voice = voice;

    if (speaker === 'BOTTLE') {
      utterance.pitch = 1.3;
      utterance.rate = 1.2;
    } else if (speaker === 'AARAV') {
      utterance.pitch = 1.15;
      utterance.rate = 1.15;
    } else {
      utterance.pitch = 1.05;
      utterance.rate = 1.1;
    }

    let hasEnded = false;
    const handleEnd = () => {
      if (hasEnded || this.isPaused) return;
      hasEnded = true;
      this.speaking = false;
      if (this.fallbackTimeout) {
        clearTimeout(this.fallbackTimeout);
        this.fallbackTimeout = null;
      }
      if (onEndCallback) onEndCallback();
    };

    utterance.onend = handleEnd;
    utterance.onerror = handleEnd;

    // Safety Fallback Timeout: Guarantee advancement even if browser SpeechSynthesis fails/freezes
    const estimatedDurationMs = Math.max(2500, (cleanText.length * 85) + 1000);
    this.fallbackTimeout = setTimeout(() => {
      handleEnd();
    }, estimatedDurationMs);

    setTimeout(() => {
      if (this.synth && this.isEnabled && !this.isPaused) {
        try {
          this.synth.speak(utterance);
        } catch (e) {
          handleEnd();
        }
      } else {
        handleEnd();
      }
    }, 15);
  }

  speakSentence(sentenceObj, onEndCallback = null) {
    if (this.isPaused) return;
    if (!sentenceObj) {
      if (onEndCallback) onEndCallback();
      return;
    }
    this.speak(sentenceObj.text, sentenceObj.speaker || 'NARRATOR', onEndCallback);
  }

  cancel() {
    this.isPaused = false;
    if (this.fallbackTimeout) {
      clearTimeout(this.fallbackTimeout);
      this.fallbackTimeout = null;
    }
    if (this.activeUtterance) {
      this.activeUtterance.onend = null;
      this.activeUtterance.onerror = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
      this.speaking = false;
    }
    this.activeUtterance = null;
  }

  pause() {
    this.isPaused = true;
    if (this.fallbackTimeout) {
      clearTimeout(this.fallbackTimeout);
      this.fallbackTimeout = null;
    }
    if (this.activeUtterance) {
      this.activeUtterance.onend = null;
      this.activeUtterance.onerror = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
      this.speaking = false;
    }
    this.activeUtterance = null;
  }

  resume() {
    this.isPaused = false;
  }

  toggleEnabled() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) this.cancel();
    return this.isEnabled;
  }
}

export const narrator = new NarratorService();

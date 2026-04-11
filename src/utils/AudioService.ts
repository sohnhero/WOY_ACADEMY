/**
 * AudioService: Procedural Sound Synthesis for Woy Academy
 * Generates typewriter clicks and interaction sounds without external assets.
 */

class AudioService {
  private ctx: AudioContext | null = null;
  private isInitialized = false;
  private typewriterBuffer: AudioBuffer | null = null;
  private typewriterSource: AudioBufferSourceNode | null = null;
  private typewriterGain: GainNode | null = null;

  private init() {
    if (this.isInitialized) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
      this.preloadAssets();
    } catch (e) {
      console.warn('AudioContext not supported', e);
    }
  }

  public async preloadAssets() {
    if (!this.ctx) return;
    try {
      const response = await fetch('/audio/typewriter.mp3');
      const arrayBuffer = await response.arrayBuffer();
      this.typewriterBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      return true;
    } catch (e) {
      console.error('Failed to load typewriter sound', e);
      return false;
    }
  }

  public isReady() {
    return !!this.typewriterBuffer;
  }

  /**
   * Starts a continuous typewriter typing loop.
   */
  public startTypewriterLoop() {
    this.init();
    if (!this.ctx || !this.typewriterBuffer || this.typewriterSource) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.typewriterSource = this.ctx.createBufferSource();
    this.typewriterGain = this.ctx.createGain();
    
    this.typewriterSource.buffer = this.typewriterBuffer;
    this.typewriterSource.loop = true;
    
    this.typewriterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.typewriterGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.1);
    
    this.typewriterSource.connect(this.typewriterGain);
    this.typewriterGain.connect(this.ctx.destination);
    
    this.typewriterSource.start(0, 3.2);
  }

  /**
   * Stops the typewriter loop with a graceful fade-out.
   */
  public stopTypewriterLoop() {
    if (!this.ctx || !this.typewriterSource || !this.typewriterGain) return;

    const source = this.typewriterSource;
    const gain = this.typewriterGain;

    this.typewriterSource = null;
    this.typewriterGain = null;

    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.15);
    setTimeout(() => {
      try { source.stop(); } catch(e) {}
    }, 200);
  }

  /**
   * Fallback click (single keypress).
   */
  public playTypewriterClick() {
    // Keep this for short inputs or legacy sync if needed
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800 + Math.random() * 400, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  /**
   * Trigger haptic feedback if available.
   */
  public haptic(style: 'light' | 'medium' | 'heavy' = 'light') {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      const patterns = {
        light: 10,
        medium: 30,
        heavy: [50, 20, 50]
      };
      navigator.vibrate(patterns[style]);
    }
  }

  /**
   * UI feedback sound for button clicks/choices.
   */
  public playSelection() {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }
}

export const audioService = new AudioService();

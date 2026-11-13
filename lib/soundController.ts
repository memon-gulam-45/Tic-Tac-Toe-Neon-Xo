// Sound Controller for Neon XO
// Preserves and plays all original sound files from /sounds/

type SoundKey = 'click' | 'count' | 'turnX' | 'turnO' | 'win' | 'draw' | 'moyeMoye';

const SOUND_PATHS: Record<SoundKey, string> = {
  click: '/sounds/click.mp3',
  count: '/sounds/count.mp3',
  turnX: '/sounds/turnX.mp3',
  turnO: '/sounds/turnO.mp3',
  win: '/sounds/win.mp3',
  draw: '/sounds/draw.mp3',
  moyeMoye: '/sounds/moye-moye.mp3',
};

class SoundController {
  private sounds: Map<SoundKey, HTMLAudioElement> = new Map();
  private isMuted: boolean = false;
  private initialized: boolean = false;

  constructor() {
    // Client-side initialization happens in init()
  }

  public init(initialMuted = false): void {
    if (typeof window === 'undefined' || this.initialized) return;

    this.isMuted = initialMuted;

    try {
      (Object.keys(SOUND_PATHS) as SoundKey[]).forEach((key) => {
        const audio = new Audio(SOUND_PATHS[key]);
        audio.preload = 'auto';
        this.sounds.set(key, audio);
      });
      this.initialized = true;
    } catch {
      // Audio not supported in this environment
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.stopAll();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private playSound(key: SoundKey, volume = 0.85): void {
    if (this.isMuted || typeof window === 'undefined') return;

    try {
      let audio = this.sounds.get(key);
      if (!audio) {
        audio = new Audio(SOUND_PATHS[key]);
        audio.preload = 'auto';
        this.sounds.set(key, audio);
      }

      audio.volume = Math.max(0, Math.min(1, volume));
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled browser autoplay policy silently
        });
      }
    } catch {
      // Silently handle any audio errors
    }
  }

  public stopAll(): void {
    if (typeof window === 'undefined') return;
    this.sounds.forEach((audio) => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        // Ignore
      }
    });
  }

  public playClick(): void {
    this.playSound('click', 0.6);
  }

  public playCount(): void {
    this.playSound('count', 0.7);
  }

  public playTurn(player: 'X' | 'O'): void {
    if (player === 'X') {
      this.playSound('turnX', 0.85);
    } else {
      this.playSound('turnO', 0.85);
    }
  }

  public playWin(): void {
    this.stopAll();
    this.playSound('win', 0.95);
  }

  public playDraw(): void {
    this.stopAll();
    this.playSound('draw', 0.9);
  }

  /**
   * CRITICAL REQUIREMENT:
   * Plays moye-moye.mp3 ONLY when human player loses against the bot in 1P mode.
   */
  public playMoyeMoye(): void {
    this.stopAll();
    this.playSound('moyeMoye', 1.0);
  }
}

export const soundManager = new SoundController();

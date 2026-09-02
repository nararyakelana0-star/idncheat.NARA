/* =====================================================================
   ConsoleAudio — mesin audio Console Mode (Web Audio API, tanpa file)
   · Musik: "PS Home" (default, gaya main menu PS4) + 3 trek lain
   · SFX: klik, select, back, boot (suara nyala console)
   Scheduler lookahead 0.3s; volume musik tersimpan di tema.
   ===================================================================== */

const NOTE = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.0, A2: 110.0, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
  C6: 1046.5,
}

// [nama trek, bpm, wave lead, wave bass, pola lead, pola bass, pad?, chords?]
// tiap sel = [not, durBeat] atau null (rest)
// chords: [[['C3','E3','G3'], 8], ...] — sustain pad lembut (ambient)
const TRACKS = [
  {
    id: 'ps-home',
    name: 'PS Home',
    bpm: 58,
    lead: 'sine',
    bass: 'sine',
    pad: true,
    leadGain: 0.34,
    // arp lembut di atas chord (setiap 1 beat)
    leadPattern: [
      ['C4', 1], ['E4', 1], ['G4', 1], ['B4', 1],
      ['C5', 1], ['B4', 1], ['G4', 1], ['E4', 1],
      ['A4', 1], ['C5', 1], ['E5', 1], ['C5', 1],
      ['A4', 1], ['C5', 1], ['B4', 1], ['G4', 1],
    ],
    bassPattern: [
      ['C3', 8], ['A2', 8], ['F2', 8], ['G2', 8],
    ],
    // progresi chord ambient: Cmaj7 → Am7 → Fmaj7 → G
    chords: [
      [['C3', 'E3', 'G3', 'B3'], 8],
      [['A2', 'C3', 'E3', 'G3'], 8],
      [['F2', 'A2', 'C3', 'E3'], 8],
      [['G2', 'B2', 'D3', 'G3'], 8],
    ],
  },
  {
    id: 'switch-arcade',
    name: 'Switch Arcade',
    bpm: 128,
    lead: 'square',
    bass: 'triangle',
    leadPattern: [
      ['C5', 1], ['E5', 1], ['G5', 1], ['E5', 1],
      ['A5', 1], ['G5', 1], ['E5', 1], ['C5', 1],
      ['D5', 1], ['F5', 1], ['A5', 1], ['F5', 1],
      ['G5', 1], ['E5', 1], ['C5', 2],
    ],
    bassPattern: [
      ['C3', 2], ['G2', 2], ['A2', 2], ['E2', 2],
      ['F2', 2], ['C3', 2], ['G2', 2], ['C3', 2],
    ],
  },
  {
    id: 'ps-power',
    name: 'PS Power',
    bpm: 100,
    lead: 'triangle',
    bass: 'square',
    leadPattern: [
      ['A3', 1], ['C4', 1], ['E4', 1], ['A4', 1],
      ['G4', 1], ['E4', 1], ['C4', 1], ['G3', 1],
      ['A3', 1], ['C4', 1], ['E4', 1], ['G4', 1],
      ['F4', 1], ['E4', 1], ['C4', 2],
    ],
    bassPattern: [
      ['A2', 2], ['E2', 2], ['F2', 2], ['C3', 2],
      ['G2', 2], ['D2', 2], ['A2', 2], ['A2', 2],
    ],
  },
  {
    id: 'menu-ambient',
    name: 'Menu Ambient',
    bpm: 72,
    lead: 'sine',
    bass: 'sine',
    leadPattern: [
      ['C4', 2], ['E4', 2], ['G4', 2], ['E5', 2],
      ['F4', 2], ['A4', 2], ['C5', 2], ['A4', 2],
      ['G4', 2], ['B4', 2], ['D5', 2], ['B4', 2],
      ['C5', 4], null,
    ],
    bassPattern: [
      ['C3', 4], ['A2', 4], ['F2', 4], ['G2', 4],
    ],
  },
]

export const MUSIC_TRACKS = TRACKS.map((t) => ({ id: t.id, name: t.name }))

class ConsoleAudioEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.sfxGain = null
    this.timer = null
    this.trackIdx = 0
    this.volume = 0.5
    this.playing = false
    this.leadPos = 0
    this.bassPos = 0
    this.chordPos = 0
    this.nextLeadTime = 0
    this.nextBassTime = 0
    this.nextChordTime = 0
  }

  _ensure() {
    if (this.ctx) return
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    this.ctx = new Ctx()
    this.master = this.ctx.createGain()
    this.master.gain.value = this.volume * 0.2
    // lowpass agar musik terasa halus/ambient (hangat, tidak "flat")
    const lp = this.ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 2600
    lp.Q.value = 0.4
    this.master.connect(lp)
    lp.connect(this.ctx.destination)
    this.sfxGain = this.ctx.createGain()
    this.sfxGain.gain.value = 0.35
    this.sfxGain.connect(this.ctx.destination)
  }

  async _ready() {
    this._ensure()
    if (!this.ctx) return false
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume()
      } catch {
        /* abaikan */
      }
    }
    return this.ctx.state === 'running'
  }

  get track() {
    return TRACKS[this.trackIdx]
  }

  _beat(track) {
    return 60 / track.bpm
  }

  _playNote(freq, wave, when, dur, vol, { pad = false, toSfx = false, detune = 0 } = {}) {
    if (!this.ctx) return
    const dest = toSfx ? this.sfxGain : this.master
    if (!dest) return
    const osc = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    osc.type = wave
    osc.frequency.value = freq
    if (detune) osc.detune.value = detune
    if (pad) {
      const att = Math.min(0.4, dur * 0.25)
      g.gain.setValueAtTime(0, when)
      g.gain.linearRampToValueAtTime(vol, when + att)
      g.gain.setValueAtTime(vol, when + Math.max(att, dur - 0.3))
      g.gain.linearRampToValueAtTime(0, when + dur)
    } else {
      g.gain.setValueAtTime(0, when)
      g.gain.linearRampToValueAtTime(vol, when + 0.012)
      g.gain.setValueAtTime(vol, when + dur * 0.7)
      g.gain.linearRampToValueAtTime(0, when + dur)
    }
    osc.connect(g)
    g.connect(dest)
    osc.start(when)
    osc.stop(when + dur + 0.06)
  }

  /* Vois pad chord: 2 osilator detune per nada → tekstur lembut */
  _playPadChord(notes, when, dur) {
    if (!this.ctx) return
    notes.forEach((n) => {
      const f = NOTE[n]
      if (!f) return
      this._playNote(f, 'sine', when, dur, 0.085, { pad: true, detune: -6 })
      this._playNote(f, 'sine', when, dur, 0.085, { pad: true, detune: 6 })
      // lapisan atas halus (oktaf) untuk "airy" feel
      this._playNote(f * 2, 'sine', when, dur, 0.02, { pad: true })
    })
  }

  _schedule() {
    const track = this.track
    const beat = this._beat(track)
    const ahead = this.ctx.currentTime + 0.3
    const leadGain = track.leadGain ?? 0.5
    while (this.nextLeadTime < ahead) {
      const cell = track.leadPattern[this.leadPos % track.leadPattern.length]
      if (cell) {
        this._playNote(
          NOTE[cell[0]],
          track.lead,
          this.nextLeadTime,
          beat * cell[1] * 0.98,
          leadGain,
          { pad: false }
        )
      }
      this.nextLeadTime += beat * (cell ? cell[1] : 1)
      this.leadPos++
    }
    while (this.nextBassTime < ahead) {
      const cell = track.bassPattern[this.bassPos % track.bassPattern.length]
      if (cell) this._playNote(NOTE[cell[0]], track.bass, this.nextBassTime, beat * cell[1] * 0.95, track.pad ? 0.2 : 0.38, { pad: !!track.pad })
      this.nextBassTime += beat * (cell ? cell[1] : 1)
      this.bassPos++
    }
    if (track.chords) {
      while (this.nextChordTime < ahead) {
        const cell = track.chords[this.chordPos % track.chords.length]
        this._playPadChord(cell[0], this.nextChordTime, beat * cell[1] * 1.04)
        this.nextChordTime += beat * cell[1]
        this.chordPos++
      }
    }
  }

  async start(trackIdx, volume) {
    try {
      if (trackIdx != null) this.trackIdx = trackIdx
      if (volume != null) this.volume = volume
      const ok = await this._ready()
      if (!ok) return
      if (this.playing) return
      this.playing = true
      this.leadPos = 0
      this.bassPos = 0
      this.chordPos = 0
      this.nextLeadTime = this.ctx.currentTime + 0.05
      this.nextBassTime = this.ctx.currentTime + 0.05
      this.nextChordTime = this.ctx.currentTime + 0.05
      if (this.master) this.master.gain.value = this.volume * 0.22
      this.timer = setInterval(() => {
        try {
          this._schedule()
        } catch {
          /* abaikan */
        }
      }, 120)
    } catch (err) {
      console.warn('ConsoleAudio.start gagal:', err)
    }
  }

  stop(fade = 0.35) {
    // fade halus musik sebelum suspend (biar tidak "tepot")
    if (this.ctx && this.master) {
      try {
        const t = this.ctx.currentTime
        const cur = this.master.gain.value
        this.master.gain.cancelScheduledValues(t)
        this.master.gain.setValueAtTime(cur, t)
        this.master.gain.linearRampToValueAtTime(0.0001, t + fade)
      } catch {
        /* abaikan */
      }
    }
    setTimeout(() => {
      if (this.timer) clearInterval(this.timer)
      this.timer = null
      this.playing = false
      if (this.ctx) {
        try {
          this.ctx.suspend()
        } catch {
          /* abaikan */
        }
      }
    }, fade * 1000)
  }

  setVolume(v) {
    this.volume = v
    if (this.master && this.playing) this.master.gain.value = v * 0.22
  }

  setTrack(idx) {
    this.trackIdx = idx
    if (this.playing && this.ctx) {
      this.leadPos = 0
      this.bassPos = 0
      this.chordPos = 0
      const t = this.ctx.currentTime + 0.05
      this.nextLeadTime = t
      this.nextBassTime = t
      this.nextChordTime = t
    }
  }

  get isPlaying() {
    return this.playing
  }

  /* ----------------------------- SFX ----------------------------- */

  _sfx(fn) {
    if (!this.ctx) return
    try {
      fn(this.ctx, this.sfxGain)
    } catch {
      /* abaikan */
    }
  }

  /* Klik halus (semua tombol saat Console Mode) */
  playClick() {
    this._ensure()
    if (!this.ctx || this.ctx.state !== 'running') return
    this._sfx((ctx, dest) => {
      const t = ctx.currentTime
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1400, t)
      osc.frequency.exponentialRampToValueAtTime(900, t + 0.05)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.linearRampToValueAtTime(0.5, t + 0.008)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)
      osc.connect(g)
      g.connect(dest)
      osc.start(t)
      osc.stop(t + 0.08)
    })
  }

  /* Select / navigasi (dua nada naik, gaya TVOS) */
  playSelect() {
    this._ensure()
    if (!this.ctx || this.ctx.state !== 'running') return
    this._sfx((ctx, dest) => {
      const t = ctx.currentTime
      ;[880, 1318.5].forEach((f, i) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = f
        const t0 = t + i * 0.06
        g.gain.setValueAtTime(0.0001, t0)
        g.gain.linearRampToValueAtTime(0.4, t0 + 0.01)
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16)
        osc.connect(g)
        g.connect(dest)
        osc.start(t0)
        osc.stop(t0 + 0.2)
      })
    })
  }

  /* Back / tutup (nada turun) */
  playBack() {
    this._ensure()
    if (!this.ctx || this.ctx.state !== 'running') return
    this._sfx((ctx, dest) => {
      const t = ctx.currentTime
      ;[1318.5, 880].forEach((f, i) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.value = f
        const t0 = t + i * 0.05
        g.gain.setValueAtTime(0.0001, t0)
        g.gain.linearRampToValueAtTime(0.35, t0 + 0.01)
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14)
        osc.connect(g)
        g.connect(dest)
        osc.start(t0)
        osc.stop(t0 + 0.18)
      })
    })
  }

  /* Suara boot console: "thump" sub + sweep naik + chime */
  async playBoot() {
    try {
      const ok = await this._ready()
      if (!ok) return
      const ctx = this.ctx
      const dest = this.sfxGain
      if (!dest) return
      const t = ctx.currentTime + 0.02

      // 1) sub-thump (denyut power on)
      const thump = ctx.createOscillator()
      const tg = ctx.createGain()
      thump.type = 'sine'
      thump.frequency.setValueAtTime(70, t)
      thump.frequency.exponentialRampToValueAtTime(38, t + 0.9)
      tg.gain.setValueAtTime(0.0001, t)
      tg.gain.linearRampToValueAtTime(0.9, t + 0.03)
      tg.gain.exponentialRampToValueAtTime(0.0001, t + 1.1)
      thump.connect(tg)
      tg.connect(dest)
      thump.start(t)
      thump.stop(t + 1.2)

      // 2) sweep naik (whoosh)
      const sw = ctx.createOscillator()
      const swf = ctx.createBiquadFilter()
      const swg = ctx.createGain()
      sw.type = 'sawtooth'
      sw.frequency.setValueAtTime(90, t + 0.15)
      sw.frequency.exponentialRampToValueAtTime(1200, t + 1.0)
      swf.type = 'bandpass'
      swf.frequency.setValueAtTime(300, t + 0.15)
      swf.frequency.exponentialRampToValueAtTime(2400, t + 1.0)
      swf.Q.value = 1.2
      swg.gain.setValueAtTime(0.0001, t + 0.15)
      swg.gain.linearRampToValueAtTime(0.16, t + 0.55)
      swg.gain.exponentialRampToValueAtTime(0.0001, t + 1.15)
      sw.connect(swf)
      swf.connect(swg)
      swg.connect(dest)
      sw.start(t + 0.15)
      sw.stop(t + 1.2)

      // 3) chime lembut (C5-E5-G5)
      ;[523.25, 659.25, 783.99].forEach((f, i) => {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = 'sine'
        o.frequency.value = f
        const t0 = t + 1.15 + i * 0.12
        g.gain.setValueAtTime(0.0001, t0)
        g.gain.linearRampToValueAtTime(0.3, t0 + 0.02)
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.4)
        o.connect(g)
        g.connect(dest)
        o.start(t0)
        o.stop(t0 + 1.5)
      })
    } catch (err) {
      console.warn('Boot SFX gagal:', err)
    }
  }

  /* Suara power down: sweep turun + thump lembut (kebalikan boot) */
  async playPowerDown() {
    try {
      const ok = await this._ready()
      if (!ok) return
      const ctx = this.ctx
      const dest = this.sfxGain
      if (!dest) return
      const t = ctx.currentTime + 0.02

      // 1) sweep turun
      const sw = ctx.createOscillator()
      const swf = ctx.createBiquadFilter()
      const swg = ctx.createGain()
      sw.type = 'sawtooth'
      sw.frequency.setValueAtTime(1000, t)
      sw.frequency.exponentialRampToValueAtTime(70, t + 0.7)
      swf.type = 'bandpass'
      swf.frequency.setValueAtTime(2000, t)
      swf.frequency.exponentialRampToValueAtTime(200, t + 0.7)
      swf.Q.value = 1.2
      swg.gain.setValueAtTime(0.0001, t)
      swg.gain.linearRampToValueAtTime(0.14, t + 0.12)
      swg.gain.exponentialRampToValueAtTime(0.0001, t + 0.8)
      sw.connect(swf)
      swf.connect(swg)
      swg.connect(dest)
      sw.start(t)
      sw.stop(t + 0.85)

      // 2) thump penutup (sub)
      const thump = ctx.createOscillator()
      const tg = ctx.createGain()
      thump.type = 'sine'
      thump.frequency.setValueAtTime(55, t + 0.55)
      thump.frequency.exponentialRampToValueAtTime(34, t + 1.0)
      tg.gain.setValueAtTime(0.0001, t + 0.55)
      tg.gain.linearRampToValueAtTime(0.6, t + 0.6)
      tg.gain.exponentialRampToValueAtTime(0.0001, t + 1.15)
      thump.connect(tg)
      tg.connect(dest)
      thump.start(t + 0.55)
      thump.stop(t + 1.2)
    } catch (err) {
      console.warn('PowerDown SFX gagal:', err)
    }
  }
}

export const consoleMusic = new ConsoleAudioEngine()

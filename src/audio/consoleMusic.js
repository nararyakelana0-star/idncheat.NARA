/* =====================================================================
   ConsoleMusic — mesin musik chiptune (Web Audio API, tanpa file audio)
   3 trek bergaya console: Switch Arcade · PS Power · Menu Ambient.
   Scheduler lookahead 0.3s; volume & trek tersimpan di tema.
   ===================================================================== */

const NOTE = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.0, A2: 110.0, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
  C6: 1046.5,
}

// [nama trek, tempo (bpm), wave lead, wave bass, baris pola]
// tiap sel = [not, durBeat] atau null (rest)
const TRACKS = [
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

class ConsoleMusicEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.timer = null
    this.trackIdx = 0
    this.volume = 0.5
    this.playing = false
    this.leadPos = 0
    this.bassPos = 0
    this.nextLeadTime = 0
    this.nextBassTime = 0
  }

  _ensure() {
    if (this.ctx) return
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    this.ctx = new Ctx()
    this.master = this.ctx.createGain()
    this.master.gain.value = this.volume * 0.22
    this.master.connect(this.ctx.destination)
  }

  get track() {
    return TRACKS[this.trackIdx]
  }

  _beat(track) {
    return 60 / track.bpm
  }

  _playNote(freq, wave, when, dur, vol) {
    if (!this.ctx) return
    const osc = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    osc.type = wave
    osc.frequency.value = freq
    g.gain.setValueAtTime(0, when)
    g.gain.linearRampToValueAtTime(vol, when + 0.01)
    g.gain.setValueAtTime(vol, when + dur * 0.7)
    g.gain.linearRampToValueAtTime(0, when + dur)
    osc.connect(g)
    g.connect(this.master)
    osc.start(when)
    osc.stop(when + dur + 0.05)
  }

  _schedule() {
    const track = this.track
    const beat = this._beat(track)
    const ahead = this.ctx.currentTime + 0.3
    while (this.nextLeadTime < ahead) {
      const cell = track.leadPattern[this.leadPos % track.leadPattern.length]
      if (cell) this._playNote(NOTE[cell[0]], track.lead, this.nextLeadTime, beat * cell[1] * 0.92, 0.5)
      this.nextLeadTime += beat * (cell ? cell[1] : 1)
      this.leadPos++
    }
    while (this.nextBassTime < ahead) {
      const cell = track.bassPattern[this.bassPos % track.bassPattern.length]
      if (cell) this._playNote(NOTE[cell[0]], track.bass, this.nextBassTime, beat * cell[1] * 0.95, 0.4)
      this.nextBassTime += beat * (cell ? cell[1] : 1)
      this.bassPos++
    }
  }

  start(trackIdx, volume) {
    if (trackIdx != null) this.trackIdx = trackIdx
    if (volume != null) this.volume = volume
    this._ensure()
    if (!this.ctx) return
    if (this.ctx.state === 'suspended') this.ctx.resume()
    if (this.playing) return
    this.playing = true
    this.leadPos = 0
    this.bassPos = 0
    this.nextLeadTime = this.ctx.currentTime + 0.05
    this.nextBassTime = this.ctx.currentTime + 0.05
    if (this.master) this.master.gain.value = this.volume * 0.22
    this.timer = setInterval(() => this._schedule(), 120)
  }

  stop() {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
    this.playing = false
    if (this.ctx) this.ctx.suspend()
  }

  setVolume(v) {
    this.volume = v
    if (this.master && this.playing) this.master.gain.value = v * 0.22
  }

  setTrack(idx) {
    this.trackIdx = idx
    if (this.playing) {
      // mulai ulang pola dengan trek baru
      this.leadPos = 0
      this.bassPos = 0
      const t = this.ctx.currentTime + 0.05
      this.nextLeadTime = t
      this.nextBassTime = t
    }
  }

  get isPlaying() {
    return this.playing
  }
}

export const consoleMusic = new ConsoleMusicEngine()

/* =====================================================================
   Cursor — preset kursor SVG (data-URI, tanpa file) + custom upload
   Aktif di Console Mode via CSS var --cursor-main / --cursor-pointer.
   ===================================================================== */

const HOT = '16 16' // hotspot tengah (kursor bulat)

const DOT =
  "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='16' cy='16' r='5.5' fill='#ffffff' stroke='#1e1b4b' stroke-width='2.5'/></svg>"

const RING =
  "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='16' cy='16' r='10' fill='none' stroke='#2d8cff' stroke-width='3'/><circle cx='16' cy='16' r='2.5' fill='#ffffff'/></svg>"

const CROSSHAIR =
  "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><g stroke='#ffffff' stroke-width='2.4' stroke-linecap='round'><line x1='16' y1='2' x2='16' y2='11'/><line x1='16' y1='21' x2='16' y2='30'/><line x1='2' y1='16' x2='11' y2='16'/><line x1='21' y1='16' x2='30' y2='16'/></g><circle cx='16' cy='16' r='3' fill='none' stroke='#2d8cff' stroke-width='2'/></svg>"

const ORB =
  "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><defs><radialGradient id='g' cx='50%' cy='40%' r='70%'><stop offset='0%' stop-color='#e0f2fe'/><stop offset='55%' stop-color='#2d8cff'/><stop offset='100%' stop-color='#1e3a8a'/></radialGradient></defs><circle cx='16' cy='16' r='9' fill='url(%23g)' stroke='rgba(255,255,255,0.85)' stroke-width='1.5'/></svg>"

export const CURSOR_PRESETS = [
  { id: 'default', name: 'Default', svg: null, preview: '↖' },
  { id: 'dot', name: 'Dot', svg: DOT, preview: '●' },
  { id: 'ring', name: 'Ring', svg: RING, preview: '◉' },
  { id: 'crosshair', name: 'Crosshair', svg: CROSSHAIR, preview: '✚' },
  { id: 'orb', name: 'Orb Neon', svg: ORB, preview: '◍' },
]

function toDataUrl(svgOrUrl) {
  if (svgOrUrl.startsWith('data:')) return svgOrUrl
  return `data:image/svg+xml,${encodeURIComponent(svgOrUrl)}`
}

/* Hasilkan CSS variable value untuk kursor tema */
export function buildCursorVars(theme) {
  const preset = CURSOR_PRESETS.find((p) => p.id === theme.cursor)
  const src = theme.cursorUrl || (preset && preset.svg)
  if (!src) return { main: '', pointer: '' }
  const url = toDataUrl(src)
  return {
    main: `url("${url}") ${HOT}, default`,
    pointer: `url("${url}") ${HOT}, pointer`,
  }
}

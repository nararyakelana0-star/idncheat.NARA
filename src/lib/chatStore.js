/* =====================================================================
   chatStore — state chat ringan (di luar React) untuk badge sidebar
   ============================================================ */

let connected = false
let online = []
let unread = 0
let lastMessage = null
const listeners = new Set()

function emit() {
  listeners.forEach((fn) => fn(getState()))
}

function getState() {
  return { connected, online, unread, lastMessage }
}

export const chatStore = {
  subscribe(fn) {
    listeners.add(fn)
    fn(getState())
    return () => listeners.delete(fn)
  },
  setConnected(v) {
    connected = v
    emit()
  },
  setOnline(users) {
    online = users
    emit()
  },
  addMessage() {
    lastMessage = Date.now()
    emit()
  },
  addUnread() {
    unread += 1
    emit()
  },
  clearUnread() {
    unread = 0
    emit()
  },
}

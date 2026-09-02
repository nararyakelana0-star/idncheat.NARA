import React from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

/* =====================================================================
   ErrorBoundary — menangkap error React agar tidak "layar hitam".
   Menampilkan panel pemulihan + tombol coba lagi.
   ===================================================================== */

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[IDNCheat] ErrorBoundary:', error, info?.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="mx-auto mt-16 max-w-md">
        <div className="card p-6 text-center sm:p-8">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
            <AlertTriangle className="h-7 w-7" />
          </span>
          <h2 className="mt-4 font-display text-lg font-extrabold text-slate-900 dark:text-white">
            Waduh, terjadi kesalahan
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {String(this.state.error?.message || this.state.error)}
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              onClick={() => this.setState({ error: null })}
              className="btn-primary inline-flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="h-4 w-4" /> Coba Lagi
            </button>
            <button onClick={() => window.location.reload()} className="btn-ghost">
              Muat Ulang Aplikasi
            </button>
          </div>
        </div>
      </div>
    )
  }
}

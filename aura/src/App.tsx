import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-lexend">
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            AURA — AI Wellness Planner
          </h1>
          <span className="text-premium-gold font-medium">Luxury · Personalized · AI</span>
        </div>
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-black/30">
          <p className="text-slate-300">
            Welcome. Your premium dark theme is configured with Tailwind and the Lexend font.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App

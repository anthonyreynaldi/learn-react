// Handbook shell — uses concepts from later parts. You don't need to understand it yet.
//
// Top bar: menu button (narrow screens only), title, and light/dark toggle.
import { BookOpen, Menu, Moon, Sun } from 'lucide-react'

function HeaderBar({ theme, onToggleTheme, onOpenMenu }) {
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <button
        type="button"
        onClick={onOpenMenu}
        className="icon-button lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <a href="#" className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
        <span className="grid size-8 place-items-center rounded-lg bg-sky-500 text-white">
          <BookOpen size={18} />
        </span>
        React Handbook
      </a>

      <button
        type="button"
        onClick={onToggleTheme}
        className="icon-button ml-auto"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  )
}

export default HeaderBar

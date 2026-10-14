import * as React from 'react'
import { Home, Menu, MessageCircle } from 'lucide-react'
import { ExpandableMobileNav, type ExpandableMobileNavEntry } from '@/components/ui/expandable-mobile-nav'
import { navigate } from 'astro:transitions/client'
import { links, navPages } from '@/data/site'

const linkClass =
  'flex min-h-11 items-center rounded-lg px-3 font-serif text-[17px] text-paper transition-colors hover:bg-white/10'

export default function MobileNav() {
  const [value, setValue] = React.useState<string | null>(null)
  const close = () => setValue(null)

  const items: ExpandableMobileNavEntry[] = [
    { id: 'inicio', label: 'Inicio', ariaLabel: 'Ir al inicio', icon: Home },
    {
      id: 'menu',
      label: 'Menú',
      icon: Menu,
      panelContent: (
        <ul className="p-2">
          {navPages.map((page) => (
            <li key={page.href}>
              <a href={page.href} onClick={close} className={linkClass}>
                {page.label}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'informes',
      label: 'Informes',
      ariaLabel: 'Pedir informes',
      icon: MessageCircle,
      panelContent: (
        <ul className="p-2">
          <li>
            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={close} className={linkClass}>
              WhatsApp<span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          </li>
          <li>
            <a href={links.email} onClick={close} className={linkClass}>
              Correo
            </a>
          </li>
        </ul>
      ),
    },
  ]

  return (
    <div className="on-ink pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ExpandableMobileNav
        aria-label="Navegación"
        className="pointer-events-auto"
        navItems={items}
        value={value}
        onValueChange={(next) => {
          if (next === 'inicio') {
            setValue(null)
            if (location.pathname !== '/') {
              navigate('/')
              return
            }
            const lenis = (window as Window & { __lenis?: { scrollTo: (target: number) => void } }).__lenis
            if (lenis) lenis.scrollTo(0)
            else window.scrollTo({ top: 0 })
            return
          }
          setValue(next)
        }}
        layout={{ iconSize: 22, collapsedPadding: 12, expandedPadding: 16, gap: 6 }}
        classNames={{
          shell: 'rounded-2xl bg-ink ring-1 ring-white/15 shadow-[0_20px_50px_-15px_rgb(26_24_20/0.6)]',
          activeItem: 'bg-white/10 text-paper',
          item: 'text-paper/75 hover:bg-white/10 hover:text-paper',
        }}
      />
    </div>
  )
}

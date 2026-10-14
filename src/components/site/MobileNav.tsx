import * as React from 'react'
import { ArrowUp, Menu, MessageCircle } from 'lucide-react'
import { ExpandableMobileNav, type ExpandableMobileNavEntry } from '@/components/ui/expandable-mobile-nav'
import { links, sections } from '@/data/site'

const linkClass =
  'flex min-h-11 items-center rounded-lg px-3 text-[15px] text-ink transition-colors hover:bg-gold-soft'

export default function MobileNav() {
  const [value, setValue] = React.useState<string | null>(null)
  const close = () => setValue(null)

  const items: ExpandableMobileNavEntry[] = [
    { id: 'inicio', label: 'Inicio', ariaLabel: 'Volver al inicio', icon: ArrowUp },
    {
      id: 'menu',
      label: 'Menú',
      icon: Menu,
      panelContent: (
        <ul className="p-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} onClick={close} className={linkClass}>
                {section.label}
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
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center pb-[env(safe-area-inset-bottom)] md:hidden">
      <ExpandableMobileNav
        aria-label="Navegación"
        className="pointer-events-auto"
        navItems={items}
        value={value}
        onValueChange={(next) => {
          if (next === 'inicio') {
            window.scrollTo({ top: 0 })
            setValue(null)
            return
          }
          setValue(next)
        }}
        layout={{ iconSize: 22, collapsedPadding: 12, expandedPadding: 16, gap: 6 }}
        classNames={{
          shell: 'bg-surface/95 backdrop-blur',
          activeItem: 'bg-gold-soft text-ink',
          item: 'text-ink-soft',
        }}
      />
    </div>
  )
}

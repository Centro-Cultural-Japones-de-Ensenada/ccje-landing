import * as React from 'react'
import { motion } from 'motion/react'
import { Mail } from 'lucide-react'
import { siFacebook, siWhatsapp, siYoutube } from 'simple-icons'
import { cn } from '@/lib/utils'
import { links, site } from '@/data/site'

/**
 * "Liquid Glass Social" de Sketcher UI (https://skecher-ui.com), con las redes del Centro.
 * Una pastilla de vidrio sigue al cursor (o al foco del teclado) entre los íconos.
 */
function BrandIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={path} />
    </svg>
  )
}

const socialLinks = [
  {
    name: 'Facebook',
    href: site.social.facebook,
    icon: (props: { className?: string }) => <BrandIcon path={siFacebook.path} {...props} />,
  },
  {
    name: 'YouTube',
    href: site.social.youtube,
    icon: (props: { className?: string }) => <BrandIcon path={siYoutube.path} {...props} />,
  },
  {
    name: 'WhatsApp',
    href: links.whatsapp,
    icon: (props: { className?: string }) => <BrandIcon path={siWhatsapp.path} {...props} />,
  },
  {
    name: 'Correo',
    href: links.email,
    icon: (props: { className?: string }) => <Mail aria-hidden="true" strokeWidth={1.75} {...props} />,
  },
]

export default function LiquidGlassSocial({ className, id }: { className?: string; id?: string }) {
  const [active, setActive] = React.useState<string | null>(null)
  const layoutId = React.useId()

  return (
    <ul className={cn('flex items-center gap-2', className)} onMouseLeave={() => setActive(null)} aria-labelledby={id}>
      {socialLinks.map((social) => {
        const Icon = social.icon
        const external = social.href.startsWith('http')
        return (
          <li key={social.name}>
            <a
              href={social.href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onMouseEnter={() => setActive(social.name)}
              onFocus={() => setActive(social.name)}
              onBlur={() => setActive(null)}
              aria-label={external ? `${social.name} (se abre en otra pestaña)` : social.name}
              className="relative flex size-14 items-center justify-center rounded-2xl text-paper/80 transition-colors hover:text-paper"
            >
              {active === social.name ? (
                <motion.span
                  layoutId={layoutId}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.45 }}
                  className="absolute inset-0 rounded-2xl bg-white/10 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14),inset_0_1px_0_rgb(255_255_255/0.22),0_18px_40px_-18px_rgb(0_0_0/0.6)] backdrop-blur-md"
                />
              ) : null}
              <Icon className="relative z-10 size-6" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

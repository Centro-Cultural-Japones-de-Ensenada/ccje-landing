'use client'

/**
 * Scroll Text Reveal de Space UI (https://www.spaceui.one), aligerado:
 * en lugar de un valor animado por palabra, el scroll escribe una sola variable CSS (--p)
 * y cada palabra calcula su color en CSS (ver `.str-token` en global.css).
 */
import * as React from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { cn } from '@/lib/utils'

export interface ScrollTextRevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Texto que se revela con el scroll. */
  text: string
  /** Etiqueta HTML. @default "p" */
  as?: React.ElementType
  /** Color inicial de las palabras. */
  fromColor: string
  /** Color final de las palabras. */
  toColor: string
  /** Parte del recorrido (0-1) en la que termina el revelado. @default 0.85 */
  revealRatio?: number
  /** Offset de useScroll. @default ["start 0.9", "center 0.5"] */
  offset?: any
}

export function ScrollTextReveal({
  text,
  as: Component = 'p',
  className,
  fromColor,
  toColor,
  revealRatio = 0.85,
  offset = ['start 0.9', 'center 0.5'],
  style,
  ...props
}: ScrollTextRevealProps) {
  const ref = React.useRef<HTMLElement | null>(null)
  const words = React.useMemo(() => text.trim().split(/\s+/), [text])
  const { scrollYProgress } = useScroll({ target: ref, offset })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    ref.current?.style.setProperty('--p', String(Math.min(value / revealRatio, 1)))
  })

  return (
    <Component
      ref={ref}
      className={cn('relative', className)}
      style={{ ...style, '--n': words.length + 1.5, '--str-from': fromColor, '--str-to': toColor } as React.CSSProperties}
      {...props}
    >
      {/* Los lectores de pantalla leen la frase completa, no las palabras sueltas. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span className="str-token" style={{ '--i': i } as React.CSSProperties}>
              {word}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </span>
    </Component>
  )
}

export default ScrollTextReveal

import * as React from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Tarjetas que se apilan al hacer scroll, adaptadas de "Sticky Scroll Cards" de Componentry
 * (https://componentry.dev). Aquí llevan texto en lugar de fotos, y el scroll suave lo pone Lenis
 * para toda la página. Si una tarjeta trae `href`, toda la tarjeta es un enlace.
 */
export interface StackedCard {
  kanji: string
  reading: string
  title: string
  text: string
  href?: string
}

const TONES = [
  { card: 'bg-surface text-ink', muted: 'text-ink-soft', accent: 'text-gold-strong' },
  { card: 'bg-ink text-paper on-ink', muted: 'text-white/80', accent: 'text-white/80' },
  { card: 'bg-paper-deep text-ink', muted: 'text-ink-soft', accent: 'text-gold-strong' },
  // Sobre rojo el texto va en blanco puro para mantener 4.5:1.
  { card: 'bg-brand text-white on-ink', muted: 'text-white', accent: 'text-white' },
]

function Card({
  card,
  index,
  total,
  progress,
  reduceMotion,
}: {
  card: StackedCard
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  reduceMotion: boolean
}) {
  const start = index / total
  const restingScale = 1 - (total - index - 1) * 0.04
  const scale = useTransform(progress, [start, 1], reduceMotion ? [1, 1] : [1, restingScale])
  const tone = TONES[index % TONES.length]

  const content = (
    <>
      <div className="flex items-start justify-between md:flex-col">
        <span className={cn('eyebrow whitespace-nowrap', tone.accent)}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <p lang="ja" aria-hidden="true" className="font-serif text-[3.75rem] leading-none whitespace-nowrap opacity-90 sm:text-[5.5rem] md:text-[9rem]">
          {card.kanji}
        </p>
      </div>
      <div className="mt-10 flex flex-col justify-end md:mt-0">
        <p lang="ja-Latn" className={cn('eyebrow', tone.muted)}>
          {card.reading}
        </p>
        <h3 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">{card.title}</h3>
        <p className={cn('mt-5 max-w-md text-lg leading-relaxed', tone.muted)}>{card.text}</p>
        {card.href ? (
          <span className="mt-8 inline-flex items-center gap-4 text-[15px]">
            Ver página
            <span className="relative block h-px w-12 overflow-hidden bg-current/30">
              <span className="absolute inset-0 origin-left scale-x-0 bg-current transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </span>
          </span>
        ) : null}
      </div>
    </>
  )

  const className = cn(
    'group relative grid min-h-[62vh] origin-top overflow-hidden rounded-[2px] p-8 shadow-[0_30px_80px_-30px_rgb(26_24_20/0.45)] md:grid-cols-[1fr_1.1fr] md:p-14',
    tone.card,
  )

  return (
    <li className="sticky" style={{ top: `calc(14vh + ${index * 28}px)` }}>
      {card.href ? (
        <motion.a href={card.href} style={{ scale }} className={className}>
          {content}
        </motion.a>
      ) : (
        <motion.article style={{ scale }} className={className}>
          {content}
        </motion.article>
      )}
    </li>
  )
}

export default function StackedCards({ cards, className }: { cards: StackedCard[]; className?: string }) {
  const container = React.useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })

  return (
    <ol ref={container} className={cn('relative flex flex-col gap-[14vh] pb-[6vh]', className)}>
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          total={cards.length}
          progress={scrollYProgress}
          reduceMotion={reduceMotion}
        />
      ))}
    </ol>
  )
}

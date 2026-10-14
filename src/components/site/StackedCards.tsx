import * as React from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Tarjetas que se apilan al hacer scroll, adaptadas de "Sticky Scroll Cards" de Componentry
 * (https://componentry.dev). Aquí llevan texto en lugar de fotos, y el scroll suave lo pone Lenis
 * para toda la página.
 */
export interface StackedCard {
  kanji: string
  reading: string
  title: string
  text: string
}

const TONES = [
  'bg-surface text-ink',
  'bg-ink text-paper on-ink',
  'bg-paper-deep text-ink',
  'bg-brand text-white on-ink',
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
  // Sobre rojo el texto va en blanco puro para mantener 4.5:1.
  const muted = index === 3 ? 'text-white' : index % 2 === 1 ? 'text-white/80' : null

  return (
    <li className="sticky" style={{ top: `calc(14vh + ${index * 28}px)` }}>
      <motion.article
        style={{ scale }}
        className={cn(
          'relative grid min-h-[62vh] origin-top overflow-hidden rounded-[2px] p-8 shadow-[0_30px_80px_-30px_rgb(26_24_20/0.45)] md:grid-cols-[1fr_1.1fr] md:p-14',
          TONES[index % TONES.length],
        )}
      >
        <div className="flex items-start justify-between md:flex-col">
          <span className={cn('eyebrow', muted ?? 'text-gold-strong')}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <p lang="ja" aria-hidden="true" className="font-serif text-[5.5rem] leading-none opacity-90 md:text-[9rem]">
            {card.kanji}
          </p>
        </div>
        <div className="mt-10 flex flex-col justify-end md:mt-0">
          <p lang="ja-Latn" className={cn('eyebrow', muted ?? 'text-ink-soft')}>
            {card.reading}
          </p>
          <h3 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">{card.title}</h3>
          <p className={cn('mt-5 max-w-md text-lg leading-relaxed', muted ?? 'text-ink-soft')}>
            {card.text}
          </p>
        </div>
      </motion.article>
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

import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'

/**
 * Intro de saludos, adaptada de "Words Preloader" de Space UI (https://www.spaceui.one).
 * Cubre la pantalla con los saludos y sale con una cortina curva. Solo se muestra una vez por sesión.
 */
const WORDS = ['こんにちは', 'Hola', 'ようこそ', 'Bienvenidos', '晴耕雨読']
const SEEN_KEY = 'ccje-intro-vista'

function finish() {
  ;(window as Window & { __introDone?: boolean }).__introDone = true
  window.dispatchEvent(new Event('intro:done'))
}

export default function Intro() {
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Sin almacenamiento: se muestra cada vez, no pasa nada.
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (seen || reduce) {
      setVisible(false)
      finish()
      return
    }
    const timer = window.setTimeout(() => setVisible(false), 2300)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible ? <Curtain key="intro" /> : null}
    </AnimatePresence>
  )
}

function Curtain() {
  const [index, setIndex] = React.useState(0)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const measure = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  React.useEffect(() => {
    if (index >= WORDS.length - 1) return
    const timer = window.setTimeout(() => setIndex((i) => i + 1), index === 0 ? 800 : 280)
    return () => window.clearTimeout(timer)
  }, [index])

  const { width, height } = size
  const curved = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`
  const flat = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`

  return (
    <motion.div
      data-intro
      aria-hidden="true"
      className="fixed inset-0 z-[80] flex items-center justify-center"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 } }}
    >
      <div className="absolute inset-0 bg-ink" />
      {width > 0 ? (
        <svg className="pointer-events-none absolute top-0 left-0 h-[calc(100%+300px)] w-full">
          <motion.path
            className="fill-ink"
            initial={{ d: curved }}
            exit={{ d: flat, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.25 } }}
          />
        </svg>
      ) : null}
      <motion.p
        key={WORDS[index]}
        lang={/[぀-ヿ一-龯]/.test(WORDS[index]) ? 'ja' : 'es'}
        className="relative z-10 flex items-center gap-4 font-serif text-4xl text-paper md:text-6xl"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }}
      >
        <span className="size-2 rounded-full bg-brand" />
        {WORDS[index]}
      </motion.p>
    </motion.div>
  )
}

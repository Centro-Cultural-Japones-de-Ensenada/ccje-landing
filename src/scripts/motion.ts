import Lenis from 'lenis'
import { animate, createScope, createTimeline, onScroll, stagger } from 'animejs'

type MotionWindow = Window & { __lenis?: Lenis; __curtainCovering?: boolean }
const w = window as MotionWindow
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Scroll suave para todo el sitio. Se crea una vez; el enrutador de Astro conserva la ventana.
if (!reduceMotion) {
  w.__lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 }, lerp: 0.1 })
}

document.addEventListener('astro:after-swap', () => {
  // El enrutador cambia los atributos de <html>; se vuelve a marcar que hay JS.
  document.documentElement.classList.add('js-motion')
  if (w.__lenis) document.documentElement.classList.add('lenis', 'lenis-smooth')
  w.__lenis?.scrollTo(0, { immediate: true, force: true })
  w.__lenis?.resize()
})

/** Corre `fn` cuando la cortina ya no tapa la página. */
function whenUncovered(fn: () => void) {
  if (!w.__curtainCovering) return fn()
  window.addEventListener('curtain:out', fn, { once: true })
}

function initPage() {
  if (reduceMotion) return () => {}

  const observers: IntersectionObserver[] = []
  const scope = createScope().add(() => {
    // Entrada del encabezado de la página: líneas que suben y textos que aparecen.
    whenUncovered(() => {
      const has = (selector: string) => document.querySelector(selector) !== null
      const intro = createTimeline({ defaults: { ease: 'outExpo' } })
      if (has('[data-hero-emblem]'))
        intro.add('[data-hero-emblem]', { opacity: [0, 1], scale: [0.86, 1], rotate: [-25, 0], duration: 2200 }, 0)
      if (has('[data-line]')) intro.add('[data-line]', { y: ['105%', '0%'], duration: 1400, delay: stagger(120) }, 100)
      if (has('[data-hero-fade]'))
        intro.add('[data-hero-fade]', { opacity: [0, 1], y: [12, 0], duration: 1200, delay: stagger(80) }, 500)
    })

    // El emblema del inicio gira despacio al salir de pantalla.
    const hero = document.querySelector<HTMLElement>('[data-hero]')
    if (hero && document.querySelector('[data-hero-emblem-img]')) {
      animate('[data-hero-emblem-img]', {
        rotate: [0, 30],
        scale: [1, 0.9],
        ease: 'linear',
        autoplay: onScroll({ target: hero, enter: 'top top', leave: 'top bottom', sync: true }),
      })
    }

    // Fotos con paralaje suave.
    document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
      animate(el, {
        y: ['-5%', '5%'],
        ease: 'linear',
        autoplay: onScroll({ target: el.parentElement ?? el, enter: 'bottom top', leave: 'top bottom', sync: true }),
      })
    })

    // Marquesina de kanji que avanza con el scroll.
    document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((track) => {
      animate(track, {
        x: ['0%', '-35%'],
        ease: 'linear',
        autoplay: onScroll({ target: track, enter: 'bottom top', leave: 'top bottom', sync: 0.5 }),
      })
    })

    // Emblema de fondo que gira.
    document.querySelectorAll<HTMLElement>('[data-spin]').forEach((el) => {
      animate(el, {
        rotate: [-20, 20],
        ease: 'linear',
        autoplay: onScroll({ target: el, enter: 'bottom top', leave: 'top bottom', sync: true }),
      })
    })
  })

  // Cada grupo se revela al entrar en pantalla, con sus elementos escalonados.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        const items = Array.from(entry.target.querySelectorAll('[data-reveal]'))
        if (entry.target.hasAttribute('data-reveal')) items.unshift(entry.target)
        animate(items, { opacity: [0, 1], y: [36, 0], duration: 1400, delay: stagger(110), ease: 'outExpo' })
      }
    },
    { rootMargin: '0px 0px -15% 0px' },
  )
  observers.push(observer)
  whenUncovered(() => {
    document
      .querySelectorAll('[data-reveal-group], [data-reveal]:not([data-reveal-group] [data-reveal])')
      .forEach((el) => observer.observe(el))
  })

  return () => {
    observers.forEach((o) => o.disconnect())
    scope.revert()
  }
}

let cleanup = () => {}
document.addEventListener('astro:page-load', () => {
  cleanup()
  cleanup = initPage()
})
document.addEventListener('astro:before-swap', () => {
  cleanup()
  cleanup = () => {}
})

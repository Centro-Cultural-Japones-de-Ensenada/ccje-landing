import Lenis from 'lenis'
import { animate, createTimeline, onScroll, stagger } from 'animejs'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!reduceMotion) {
  // Scroll suave para toda la página; también lleva los enlaces #ancla.
  const lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 }, lerp: 0.09 })
  ;(window as Window & { __lenis?: Lenis }).__lenis = lenis

  // El inicio entra cuando se va la intro (o enseguida si no hubo intro).
  const startHero = () => {
    createTimeline({ defaults: { ease: 'outExpo' } })
      .add('[data-hero-emblem]', { opacity: [0, 1], scale: [0.86, 1], rotate: [-25, 0], duration: 2200 })
      .add('[data-line]', { y: ['105%', '0%'], duration: 1400, delay: stagger(120) }, 250)
      .add('[data-hero-fade]', { opacity: [0, 1], y: [12, 0], duration: 1200, delay: stagger(80) }, 700)
  }
  const introDone = (window as Window & { __introDone?: boolean }).__introDone
  if (introDone) startHero()
  else {
    let started = false
    const once = () => {
      if (started) return
      started = true
      startHero()
    }
    window.addEventListener('intro:done', once, { once: true })
    window.setTimeout(once, 3600)
  }

  // El emblema gira despacio mientras el inicio sale de la pantalla.
  const hero = document.querySelector<HTMLElement>('[data-hero]')
  if (hero) {
    animate('[data-hero-emblem-img]', {
      rotate: [0, 30],
      scale: [1, 0.9],
      ease: 'linear',
      autoplay: onScroll({ target: hero, enter: 'top top', leave: 'top bottom', sync: true }),
    })
  }

  // Marquesina de kanji que avanza con el scroll.
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((track) => {
    animate(track, {
      x: ['0%', '-35%'],
      ease: 'linear',
      autoplay: onScroll({ target: track, enter: 'bottom top', leave: 'top bottom', sync: 0.5 }),
    })
  })

  // Emblema de fondo en contacto.
  document.querySelectorAll<HTMLElement>('[data-spin]').forEach((el) => {
    animate(el, {
      rotate: [-20, 20],
      ease: 'linear',
      autoplay: onScroll({ target: el, enter: 'bottom top', leave: 'top bottom', sync: true }),
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
        animate(items, {
          opacity: [0, 1],
          y: [36, 0],
          duration: 1400,
          delay: stagger(110),
          ease: 'outExpo',
        })
      }
    },
    { rootMargin: '0px 0px -15% 0px' },
  )

  document
    .querySelectorAll('[data-reveal-group], [data-reveal]:not([data-reveal-group] [data-reveal])')
    .forEach((el) => observer.observe(el))
}

import { animate, createTimeline, onScroll, stagger } from 'animejs'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function reveal(targets: Element[]) {
  animate(targets, {
    opacity: [0, 1],
    y: [24, 0],
    duration: 900,
    delay: stagger(80),
    ease: 'outQuart',
  })
}

if (!reduceMotion) {
  // Entrada del inicio: el emblema gira a su lugar y el texto sube detrás de él.
  createTimeline({ defaults: { ease: 'outQuart' } })
    .add('[data-hero-emblem]', { opacity: [0, 1], scale: [0.9, 1], rotate: [-12, 0], duration: 1600 })
    .add('[data-hero-item]', { opacity: [0, 1], y: [20, 0], duration: 900, delay: stagger(90) }, 200)

  // El emblema gira despacio mientras el inicio sale de la pantalla.
  const hero = document.querySelector<HTMLElement>('[data-hero]')
  if (hero) {
    animate('[data-hero-emblem-img]', {
      rotate: [0, 24],
      ease: 'linear',
      autoplay: onScroll({ target: hero, enter: 'top top', leave: 'top bottom', sync: true }),
    })
  }

  // Cada grupo se revela al entrar en pantalla, con sus elementos escalonados.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        const items = Array.from(entry.target.querySelectorAll('[data-reveal]'))
        if (entry.target.hasAttribute('data-reveal')) items.unshift(entry.target)
        reveal(items)
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  )

  document.querySelectorAll('[data-reveal-group], [data-reveal]:not([data-reveal-group] [data-reveal])').forEach((el) => {
    observer.observe(el)
  })
}

// Datos de la organización. El nombre legal debe coincidir con el registro D-U-N-S.
export const site = {
  legalName: 'Centro Cultural Japonés de Ensenada, A.C.',
  shortName: 'Centro Cultural Japonés de Ensenada',
  description:
    'Asociación civil sin fines de lucro en Ensenada, Baja California. Enseñamos el idioma japonés y compartimos su cultura con la comunidad desde los años treinta.',
  address: {
    street: 'Callejón Arce No. 829',
    neighborhood: 'Colonia Obrera',
    city: 'Ensenada',
    region: 'Baja California',
    country: 'MX',
  },
  email: 'asociacionjaponesadeensenada@gmail.com',
  phone: {
    display: '+52 646 272 1994',
    e164: '+526462721994',
  },
  social: {
    facebook: 'https://www.facebook.com/AsocJapEns',
    youtube: 'https://www.youtube.com/channel/UCCNsp6YbYUsMsur0UVj1Lag',
  },
} as const

const whatsappText = 'Hola, me gustaría recibir informes sobre las clases de japonés.'

export const links = {
  whatsapp: `https://wa.me/${site.phone.e164.slice(1)}?text=${encodeURIComponent(whatsappText)}`,
  email: `mailto:${site.email}?subject=${encodeURIComponent('Informes de clases de japonés')}`,
  tel: `tel:${site.phone.e164}`,
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.address.street}, ${site.address.neighborhood}, ${site.address.city}, ${site.address.region}`,
  )}`,
}

// Páginas del sitio. El kanji y su lectura aparecen en la cortina al cambiar de página.
export const pages = [
  { href: '/', label: 'Inicio', kanji: 'ようこそ', reading: 'Yōkoso' },
  { href: '/nosotros', label: 'Nosotros', kanji: '私たち', reading: 'Watashitachi' },
  { href: '/clases', label: 'Clases', kanji: '授業', reading: 'Jugyō' },
  { href: '/actividades', label: 'Actividades', kanji: '活動', reading: 'Katsudō' },
  { href: '/escuela', label: 'Escuela', kanji: '学校', reading: 'Gakkō' },
  { href: '/contacto', label: 'Contacto', kanji: '連絡', reading: 'Renraku' },
] as const

export type SitePage = (typeof pages)[number]

/** Páginas del menú (todas menos Inicio). */
export const navPages = pages.slice(1)

export function pageFor(href: string) {
  return pages.find((page) => page.href === href) ?? pages[0]
}

/** La página que sigue, para el enlace grande al final de cada página. */
export function nextPage(href: string) {
  const index = pages.findIndex((page) => page.href === href)
  return pages[(index + 1) % pages.length]
}

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

export const sections = [
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'clases', label: 'Clases' },
  { id: 'actividades', label: 'Actividades' },
  { id: 'escuela', label: 'Escuela' },
  { id: 'contacto', label: 'Contacto' },
] as const

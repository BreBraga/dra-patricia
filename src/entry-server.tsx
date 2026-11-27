/* Usado só no build (scripts/prerender.mjs): gera o HTML das páginas e os dados estruturados,
   para que Google, buscadores de IA e prévias de link leiam o conteúdo sem precisar rodar o JavaScript. */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import Bio from './bio/Bio'
import { contato, faq, servicos, sobre } from './conteudo'

export const renderSite = () => renderToString(<StrictMode><App /></StrictMode>)
export const renderBio = () => renderToString(<StrictMode><Bio /></StrictMode>)

/** JSON-LD da landing: a médica (Person), o consultório (Physician) e as dúvidas frequentes (FAQPage).
 *  Com o domínio (siteUrl), entram também os endereços absolutos de página, logo e imagem. */
export function dadosEstruturados(siteUrl?: string) {
  const url = siteUrl ? siteUrl.replace(/\/$/, '') + '/' : undefined
  const abs = (caminho: string) => (url ? url + caminho.replace(/^\//, '') : undefined)
  const id = (frag: string) => (url ? `${url}#${frag}` : `#${frag}`)
  const crm = contato.crm.match(/CRM-?(\w+)\s+(\d+)/)

  const medica = {
    '@type': 'Person',
    '@id': id('dra-patricia'),
    name: 'Dra. Patrícia Martins',
    alternateName: 'Patrícia Martins Pinto',
    jobTitle: 'Pediatra e Neonatologista',
    description: sobre.paragrafos[1],
    image: abs('/fotos/retrato-hero.jpg'),
    url,
    knowsAbout: ['Pediatria', 'Neonatologia', 'Puericultura', 'Prematuridade', 'Pré-natal pediátrico', 'Reanimação neonatal', 'Telemedicina pediátrica'],
    alumniOf: { '@type': 'EducationalOrganization', name: 'Instituto Nacional de Saúde da Mulher, da Criança e do Adolescente Fernandes Figueira (IFF/Fiocruz)' },
    hasCredential: crm && {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Registro no Conselho Regional de Medicina',
      name: `CRM-${crm[1]} ${crm[2]}`,
      recognizedBy: { '@type': 'Organization', name: `Conselho Regional de Medicina do Estado do ${crm[1] === 'RJ' ? 'Rio de Janeiro' : crm[1]}` },
    },
    worksFor: { '@id': id('consultorio') },
    sameAs: [contato.instagram, contato.lattes],
  }

  const consultorio = {
    '@type': 'Physician',
    '@id': id('consultorio'),
    name: 'Dra. Patrícia Martins · Pediatria e Neonatologia',
    description: 'Pediatra e neonatologista em Volta Redonda (RJ): pré-natal pediátrico, sala de parto, puericultura, prematuridade, pediatria clínica e consulta online.',
    medicalSpecialty: 'Pediatric',
    url,
    logo: abs('/marca/logo-petroleo.svg'),
    image: abs('/og-image.jpg'),
    telephone: '+55-24-99225-2662',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua 18-B, 23, sala 302, Vila Santa Cecília',
      addressLocality: 'Volta Redonda',
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
    areaServed: [{ '@type': 'City', name: 'Volta Redonda' }, { '@type': 'AdministrativeArea', name: 'Sul Fluminense' }],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    }],
    availableService: servicos.map((s) => ({ '@type': 'MedicalProcedure', name: s.nome, description: `${s.frase} ${s.resumo}` })),
    employee: { '@id': id('dra-patricia') },
    sameAs: [contato.instagram],
  }

  const duvidas = {
    '@type': 'FAQPage',
    '@id': id('duvidas'),
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.p, acceptedAnswer: { '@type': 'Answer', text: f.r } })),
  }

  const pagina = url && {
    '@type': 'WebPage',
    '@id': url,
    url,
    name: 'Pediatra e Neonatologista em Volta Redonda | Dra. Patrícia Martins',
    inLanguage: 'pt-BR',
    about: { '@id': id('consultorio') },
    mainEntity: { '@id': id('dra-patricia') },
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [pagina, medica, consultorio, duvidas].filter(Boolean) })
}

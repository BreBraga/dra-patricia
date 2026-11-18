import './bio.css'
import type { CSSProperties } from 'react'
import { contato, linkWhatsApp } from '../conteudo'
import { Simbolo } from '../marca/Simbolo'

/* Link da bio do Instagram (/bio/), para substituir o Linktree dela (linktr.ee/dra.patriciamartins_pediatra). Uma tela só, pensada para o celular:
   foto, quem é, o botão de agendar e poucos caminhos, cada um com a cor de uma linha da marca. */

const COR = { coral: '#E98456', mostarda: '#E89012', verde: '#105140', petroleo: '#124353' }

// PENDENTE: com o endereço real, o "Como chegar" passa a apontar para o consultório
const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contato.endereco)}`

const LINKS = [
  { titulo: 'Consulta online', sub: 'Para outras cidades e outros países', href: linkWhatsApp('Olá! Gostaria de agendar uma consulta online.'), cor: COR.coral, externo: true },
  { titulo: 'Conheça meu trabalho', sub: 'Serviços, consultório e dúvidas frequentes', href: '/', cor: COR.mostarda, externo: false },
  { titulo: 'Como chegar', sub: contato.enderecoCurto, href: mapa, cor: COR.petroleo, externo: true },
  { titulo: 'Currículo Lattes', sub: 'Formação, mestrado e produção científica', href: contato.lattes, cor: COR.verde, externo: true },
]

export default function Bio() {
  return (
    <div className="bio">
      <Simbolo cor="#FBF6EE" modo="carga" className="bio-fundo" />
      <main className="bio-coluna">
        <header className="bio-topo">
          <div className="bio-foto">
            <img src="/fotos/retrato-hero.jpg" alt="Dra. Patrícia Martins" width={960} height={1280} fetchPriority="high" />
          </div>
          <p className="bio-eyebrow">Pediatra e Neonatologista</p>
          <h1>Dra. Patrícia <em>Martins</em></h1>
          <p className="bio-linha">20 anos de pediatria · {contato.cidade}</p>
        </header>

        <a className="bio-agendar" href={linkWhatsApp('Olá! Gostaria de agendar uma consulta.')} target="_blank" rel="noopener noreferrer">
          Agende sua consulta
          <span className="bio-agendar-sub">pelo WhatsApp</span>
        </a>

        <ul className="bio-links">
          {LINKS.map((l, i) => (
            <li key={l.titulo} style={{ '--c': l.cor, '--i': i } as CSSProperties}>
              <a href={l.href} {...(l.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="bio-ponto" aria-hidden="true" />
                <span className="bio-txt">
                  <b>{l.titulo}</b>
                  <small>{l.sub}</small>
                </span>
                <span className="bio-seta" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="bio-rodape">
          <img src="/marca/logo-creme.svg" alt="Patrícia Martins · Pediatria & Neonatologia" />
          <p>{contato.crm} · {contato.rqe}</p>
        </footer>
      </main>
    </div>
  )
}

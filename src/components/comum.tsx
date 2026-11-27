import { useEffect, useState } from 'react'
import { contato, faq, linkWhatsApp, menu } from '../conteudo'

/** Moldura de foto. Com src mostra a foto (por enquanto, tiradas do Instagram dela);
 *  sem src fica o espaço reservado, com a legenda do que entra ali. */
export function Foto({ legenda, src, posicao, prioridade }: {
  legenda: string
  src?: string
  posicao?: string
  /** foto do topo: carrega já, com prioridade, em vez de esperar a rolagem */
  prioridade?: boolean
}) {
  if (src) {
    return (
      <div className="foto foto-real">
        <img src={src} alt={legenda} loading={prioridade ? 'eager' : 'lazy'} fetchPriority={prioridade ? 'high' : undefined}
          style={posicao ? { objectPosition: posicao } : undefined} />
      </div>
    )
  }
  return (
    <div className="foto" role="img" aria-label={`Espaço para foto: ${legenda}`}>
      <span>{legenda}</span>
    </div>
  )
}

export function Duvidas({ quantas = faq.length, primeiraAberta = true }: { quantas?: number; primeiraAberta?: boolean }) {
  return (
    <>
      {faq.slice(0, quantas).map((item, i) => (
        <details key={item.p} open={primeiraAberta && i === 0}>
          <summary>{item.p}</summary>
          <p>{item.r}</p>
        </details>
      ))}
    </>
  )
}

export function LinksMenu({ aoClicar }: { aoClicar?: () => void }) {
  return (
    <>
      {menu.map((m) => (
        <li key={m.id}>
          <a href={`#${m.id}`} onClick={aoClicar}>
            {m.rotulo}
          </a>
        </li>
      ))}
    </>
  )
}

/** Botão e painel de menu para telas onde a navegação some (até 980px). */
export function MenuCelular() {
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    if (!aberto) return
    const fechar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', fechar)
    document.body.classList.add('menu-aberto')
    return () => {
      window.removeEventListener('keydown', fechar)
      document.body.classList.remove('menu-aberto')
    }
  }, [aberto])

  return (
    <>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={aberto}
        aria-controls="menu-celular"
        onClick={() => setAberto((v) => !v)}
      >
        {aberto ? 'Fechar' : 'Menu'}
      </button>
      <div id="menu-celular" className="menu-painel" hidden={!aberto}>
        <ul>
          <LinksMenu aoClicar={() => setAberto(false)} />
        </ul>
        <a className="menu-cta" href={linkWhatsApp()}>Agende sua consulta</a>
      </div>
    </>
  )
}

export function CtaFixo({ classeBotao }: { classeBotao: string }) {
  return (
    <div className="fixo">
      <a className={`btn ${classeBotao}`} href={linkWhatsApp()}>Agende sua consulta</a>
    </div>
  )
}

function IconeInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconeWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.86 9.86 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.24 8.24 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  )
}

/** Rodapé: logo completa, contato com ícones (Instagram e WhatsApp), endereço, horários e o menu. */
export function Rodape() {
  const arroba = '@' + contato.instagram.replace(/\/$/, '').split('/').pop()
  return (
    <footer>
      <div className="wrap foot">
        <div className="foot-marca">
          <a href="#inicio" aria-label="Dra. Patrícia Martins, voltar ao início">
            <img src="/marca/logo-creme.svg" alt="Patrícia Martins · Pediatria & Neonatologia" />
          </a>
          <div className="foot-sociais">
            <a href={contato.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram (abre em nova aba)"><IconeInstagram /></a>
            <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (abre em nova aba)"><IconeWhatsApp /></a>
          </div>
        </div>

        <div className="foot-col">
          <h3>Contato</h3>
          <a className="foot-link" href={linkWhatsApp()} target="_blank" rel="noopener noreferrer"><IconeWhatsApp />{contato.whatsappExibicao}</a>
          <a className="foot-link" href={contato.instagram} target="_blank" rel="noopener noreferrer"><IconeInstagram />{arroba}</a>
        </div>

        <div className="foot-col">
          <h3>Consultório</h3>
          <p>{contato.endereco}</p>
          <p>{contato.horarios}</p>
        </div>

        <nav className="foot-col" aria-label="Rodapé">
          <h3>Navegue</h3>
          <ul><LinksMenu /></ul>
        </nav>
      </div>
      <div className="wrap">
        <div className="foot-base">
          <span>Dra. Patrícia Martins · Pediatria &amp; Neonatologia · {contato.crm}</span>
          <span>© {new Date().getFullYear()} · {contato.cidade}, RJ</span>
        </div>
      </div>
    </footer>
  )
}

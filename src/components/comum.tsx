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

export function Rodape({ simbolo }: { simbolo: string }) {
  return (
    <footer>
      <div className="wrap foot">
        <div className="assin">
          <img src={`/marca/${simbolo}.svg`} alt="" />
          <div>
            <b>Dra. Patrícia Martins</b>
            Pediatria &amp; Neonatologia · {contato.crm} · {contato.rqe}
          </div>
        </div>
        <nav aria-label="Rodapé">
          <a href={contato.instagram}>Instagram</a>
          <a href="#contato">{contato.enderecoCurto}</a>
        </nav>
      </div>
    </footer>
  )
}

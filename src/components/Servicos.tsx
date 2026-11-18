import { useRef, useState, type CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import { linkWhatsApp, servicos, type Servico } from '../conteudo'
import { Foto } from './comum'
import { Simbolo } from '../marca/Simbolo'

/** As 4 cores da identidade, cada uma em 2 serviços. */
const PALETA = {
  coral: { fundo: '#E98456', texto: '#0c2f3b' },
  mostarda: { fundo: '#E89012', texto: '#0c2f3b' },
  verde: { fundo: '#105140', texto: '#FBF6EE' },
  petroleo: { fundo: '#124353', texto: '#FBF6EE' },
}
const COR_SERVICO: Record<string, keyof typeof PALETA> = {
  'pre-natal': 'coral',
  'sala-de-parto': 'mostarda',
  puericultura: 'verde',
  prematuridade: 'petroleo',
  'pediatria-clinica': 'mostarda',
  telemedicina: 'coral',
  uti: 'petroleo',
  palestras: 'verde',
}
/** Foto de cada serviço (public/fotos/servicos). Os que ainda não têm ficam com o espaço reservado. */
const FOTO_SERVICO: Record<string, { src: string; legenda: string }> = {
  'pre-natal': { src: '/fotos/servicos/pre-natal.jpg', legenda: 'Dra. Patrícia grávida, segurando a barriga' },
  'sala-de-parto': { src: '/fotos/servicos/sala-de-parto.jpg', legenda: 'Dra. Patrícia segurando um recém-nascido na sala de parto' },
  uti: { src: '/fotos/servicos/uti.jpg', legenda: 'Recém-nascido sendo atendido em berço aquecido' },
  palestras: { src: '/fotos/servicos/palestras.jpg', legenda: 'Mãos de alunos de Medicina treinando reanimação neonatal em bonecos' },
  puericultura: { src: '/fotos/servicos/puericultura.jpg', legenda: 'Criança sorrindo ao lado da régua de altura no consultório' },
  prematuridade: { src: '/fotos/servicos/prematuridade.jpg', legenda: 'Bebê prematuro com sonda, no banho, amparado por mãos de luva' },
  'pediatria-clinica': { src: '/fotos/servicos/pediatria-clinica.jpg', legenda: 'Dra. Patrícia com o otoscópio' },
  telemedicina: { src: '/fotos/servicos/telemedicina.jpg', legenda: 'Dra. Patrícia sorrindo diante do notebook, em consulta online' },
}
const cor = (s: Servico) => PALETA[COR_SERVICO[s.slug]]
const link = (s: Servico) => (s.slug === 'telemedicina' ? '#telemedicina' : linkWhatsApp(`Olá! Gostaria de saber sobre ${s.nome.toLowerCase()}.`))
const chamada = (s: Servico) =>
  s.slug === 'pre-natal' ? 'Agende seu pré-natal' : s.slug === 'telemedicina' ? 'Como funciona' : 'Fale comigo sobre isso'

/** Serviços: um aberto em destaque (colorido, com foto, resumo e botão) e os outros só com a borda.
 *  Ao clicar num cartão menor, ele abre no lugar do destaque; a troca é animada com a View Transitions API
 *  quando o navegador tem e a pessoa não pediu menos movimento. Começa com o pré-natal, a porta de entrada. */
export function Servicos() {
  const [ativo, setAtivo] = useState(0)
  const grande = useRef<HTMLDivElement>(null)

  const abrir = (i: number) => {
    let feito = false
    const trocar = () => {
      if (feito) return
      feito = true
      flushSync(() => setAtivo(i))
    }
    const poucoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document as Document & { startViewTransition?: (f: () => void) => { finished: Promise<void> } }
    const depois = () => {
      const el = grande.current
      if (!el) return
      el.focus({ preventScroll: true })
      // no celular o destaque fica no topo da lista: leva a pessoa até ele se estiver fora da tela
      const r = el.getBoundingClientRect()
      if (r.top < 0 || r.top > window.innerHeight * 0.6) el.scrollIntoView({ behavior: poucoMovimento ? 'auto' : 'smooth', block: 'start' })
    }
    if (doc.startViewTransition && !poucoMovimento) {
      doc.startViewTransition(trocar).finished.then(depois, depois)
      // garantia: se o navegador não chegar a rodar a transição (aba em segundo plano, por exemplo), troca assim mesmo
      window.setTimeout(trocar, 400)
    } else {
      trocar()
      depois()
    }
  }

  const aberto = servicos[ativo]
  return (
    <div className="sv-destaque">
      <div ref={grande} tabIndex={-1} id="servico-aberto" className="sv-cartao sv-grande" aria-live="polite"
        style={{ background: cor(aberto).fundo, color: cor(aberto).texto, viewTransitionName: `sv-${aberto.slug}` } as CSSProperties}>
        {/* a marca se desenha de novo a cada serviço aberto (key troca e reinicia a animação) */}
        <Simbolo key={aberto.slug} cor={cor(aberto).texto} modo="carga" className="sv-marca" />
        <div className="sv-grande-foto">
          <Foto legenda={FOTO_SERVICO[aberto.slug]?.legenda ?? `Foto de ${aberto.nome.toLowerCase()}`} src={FOTO_SERVICO[aberto.slug]?.src} />
        </div>
        <div className="sv-grande-txt">
          <span className="tag">{aberto.area}</span>
          <h3>{aberto.nome}</h3>
          <p className="impacto">{aberto.frase}</p>
          <p className="resumo">{aberto.resumo}</p>
          <a className="sv-cta" href={link(aberto)}>{chamada(aberto)} <span aria-hidden="true">→</span></a>
        </div>
      </div>
      {servicos.map((s, i) =>
        i === ativo ? null : (
          <button key={s.slug} type="button" className="sv-cartao sv-pequeno" aria-controls="servico-aberto" onClick={() => abrir(i)}
            style={{ '--c': cor(s).fundo, viewTransitionName: `sv-${s.slug}` } as CSSProperties}>
            <h3>{s.nome}</h3>
            <p className="impacto">{s.frase}</p>
            <span className="seta" aria-hidden="true">+</span>
            <span className="sr">Ver mais sobre {s.nome}</span>
          </button>
        ),
      )}
      <a href={linkWhatsApp()} className="sv-cartao sv-pequeno sv-convite">
        <h3>Não sabe por onde começar?</h3>
        <p className="impacto">Me conte o momento da sua família e eu indico o caminho.</p>
        <span className="seta" aria-hidden="true">→</span>
      </a>
    </div>
  )
}

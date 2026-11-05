import './natureza.css'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { consultorio, contato, depoimentos, jornada, linkWhatsApp, onlineFunciona, servicos, sobre } from '../conteudo'
import { CtaFixo, Duvidas, Foto, LinksMenu, MenuCelular, Rodape } from '../components/comum'
import { Simbolo, useProgressoRolagem } from '../marca/Simbolo'

const COR = { creme: '#FBF6EE', profunda: '#124353', apagada: '#d9cdc1' }

/** Uma cor por serviço, misturada com regra: as cores fortes do manual (coral, mostarda, verde, petróleo)
 *  nas pontas de cada fileira e os tons claros derivados delas (céu, sálvia, rosa, manteiga) no meio.
 *  Duas cores da mesma família nunca se encostam, nem no desktop (4 colunas) nem no celular (2 colunas,
 *  onde vira xadrez forte/claro). */
const CORES_BLOCO = [
  { fundo: '#E98456', texto: '#124353', marca: '#FBF6EE' }, // coral
  { fundo: '#A8C8D2', texto: '#124353', marca: '#124353' }, // céu
  { fundo: '#B7CCA6', texto: '#124353', marca: '#124353' }, // sálvia
  { fundo: '#E89012', texto: '#124353', marca: '#124353' }, // mostarda
  { fundo: '#124353', texto: '#FBF6EE', marca: '#FBF6EE' }, // petróleo
  { fundo: '#F4BBA8', texto: '#124353', marca: '#124353' }, // rosa
  { fundo: '#F3D488', texto: '#124353', marca: '#124353' }, // manteiga
  { fundo: '#105140', texto: '#FBF6EE', marca: '#FBF6EE' }, // verde
]

/** Arco-íris de encaixar (o brinquedo Montessori), nas cores da marca. Cada arco se desenha
 *  como o traço do símbolo quando a seção aparece. */
function ArcoIris() {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('desenhando'); io.disconnect() } }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const arcos = [
    { r: 104, cor: '#124353' }, { r: 80, cor: '#105140' }, { r: 56, cor: '#E89012' }, { r: 32, cor: '#E98456' },
  ]
  return (
    <svg ref={ref} className="arco-iris" viewBox="0 0 240 128" aria-hidden="true">
      {arcos.map((a, i) => (
        <path key={a.r} d={`M${120 - a.r} 124 A${a.r} ${a.r} 0 0 1 ${120 + a.r} 124`} pathLength={1}
          fill="none" stroke={a.cor} strokeWidth={22} style={{ animationDelay: `${i * 0.18}s` }} />
      ))}
      <circle cx="120" cy="124" r="11" fill="#DFD3C8" />
    </svg>
  )
}

/** Fotos do consultório, em arcos, passando de lado. Provisórias, do Instagram dela. */
const FOTOS_CONSULTORIO = [
  { src: '/fotos/abraco-118.jpg', legenda: 'Dra. Patrícia abraçando uma criança' },
  { src: '/fotos/maozinha-118.jpg', legenda: 'Mão de um bebê' },
  { src: '/fotos/touca-118.jpg', legenda: 'Dra. Patrícia na sala de parto' },
  { src: '/fotos/pezinho-118.jpg', legenda: 'Pezinho de um recém-nascido' },
  { src: '/fotos/estetoscopio-118.jpg', legenda: 'Exame de um recém-nascido' },
  { src: '/fotos/equipe-118.jpg', legenda: 'Equipe na sala de parto' },
]

function Carrossel() {
  const trilho = useRef<HTMLDivElement>(null)
  const [atual, setAtual] = useState(0)
  const [noFim, setNoFim] = useState(false)
  // quantas paradas existem: com 2 fotos visíveis, a última parada já mostra as duas últimas
  const [paradas, setParadas] = useState(FOTOS_CONSULTORIO.length - 1)

  useEffect(() => {
    const el = trilho.current
    if (!el) return
    const medir = () => {
      const passo = ((el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1) + 14
      const visiveis = Math.max(1, Math.floor((el.clientWidth + 14) / passo))
      const total = FOTOS_CONSULTORIO.length - visiveis + 1
      const fim = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      setParadas(total)
      setNoFim(fim)
      setAtual(fim ? total - 1 : Math.round(el.scrollLeft / passo))
    }
    medir()
    el.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => { el.removeEventListener('scroll', medir); window.removeEventListener('resize', medir) }
  }, [])

  const irPara = (i: number) => {
    const el = trilho.current
    const slide = el?.children[i] as HTMLElement | undefined
    if (!el || !slide) return
    const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: suave ? 'smooth' : 'auto' })
  }

  return (
    <div className="carrossel" role="region" aria-roledescription="carrossel" aria-label="Fotos do consultório">
      <div className="trilho" ref={trilho} tabIndex={0}>
        {FOTOS_CONSULTORIO.map((f, i) => (
          <div className="slide" key={f.src} aria-label={`${i + 1} de ${FOTOS_CONSULTORIO.length}`}>
            <Foto legenda={f.legenda} src={f.src} />
          </div>
        ))}
      </div>
      <div className="carrossel-nav">
        <button type="button" aria-label="Foto anterior" disabled={atual === 0} onClick={() => irPara(atual - 1)}>←</button>
        <div className="pontos">
          {FOTOS_CONSULTORIO.slice(0, paradas).map((f, i) => (
            <button type="button" key={f.src} aria-label={`Ir para a foto ${i + 1}`} aria-current={i === atual}
              className={i === atual ? 'ativo' : undefined} onClick={() => irPara(i)} />
          ))}
        </div>
        <button type="button" aria-label="Próxima foto" disabled={noFim} onClick={() => irPara(atual + 1)}>→</button>
      </div>
    </div>
  )
}

/** Versão B · Natureza: petróleo, areia e mostarda, fotos em arco e o símbolo da marca se desenhando. */
export default function Natureza() {
  // --p da jornada: o traço do símbolo e o destaque das etapas andam juntos com a rolagem
  const tempo = useProgressoRolagem<HTMLElement>(0.75, 0.75)

  return (
    <div className="v-natureza">
      <header>
        <div className="wrap nav">
          <a className="logo" href="#inicio" aria-label="Dra. Patrícia Martins, início">
            <img src="/marca/logo-creme.svg" alt="Patrícia Martins · Pediatria & Neonatologia" />
          </a>
          <ul><LinksMenu /></ul>
          <div className="nav-acoes">
            <a className="btn btn-mostarda" href={linkWhatsApp()}>Agende sua consulta</a>
            <MenuCelular />
          </div>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <Simbolo cor={COR.creme} modo="carga" className="hero-simbolo" />
          <div className="wrap hero-grid">
            <div className="txt">
              <p className="eyebrow">Pediatra e Neonatologista · {contato.cidade}</p>
              <h1>Mais escuta, <em>menos remédio.</em></h1>
              <p className="lead">Da gestação ao crescimento, com ciência e tempo para ouvir.</p>
              <div className="ctas">
                <a className="btn btn-mostarda" href={linkWhatsApp('Olá! Gostaria de agendar o pré-natal pediátrico.')}>Agende seu pré-natal pediátrico</a>
                <a className="btn btn-creme" href="#telemedicina">Consulta online</a>
              </div>
              <div className="selos">
                <div><b>16</b>anos de pediatria</div>
                <div><b>IFF</b>Mestrado Fiocruz</div>
                <div><b>SBP</b>Reanimação neonatal</div>
              </div>
            </div>
            <div className="arco"><Foto legenda="Dra. Patrícia Martins" src="/fotos/retrato-rindo.jpg" /></div>
          </div>
        </section>

        <div className="manifesto wrap">
          <Simbolo cor={COR.profunda} modo="visivel" className="manifesto-simbolo" />
          <p>Família preparada é <em>família segura.</em></p>
        </div>

        <section className="sobre" id="sobre">
          <div className="wrap sobre-grid">
            <div className="fotos-sobre">
              <div className="a1"><Foto legenda="Dra. Patrícia Martins" src="/fotos/sentada-bege-45.jpg" /></div>
              <div className="a2"><Foto legenda="Dra. Patrícia Martins" src="/fotos/maos-bebe-quadrada.jpg" /></div>
            </div>
            <div>
              <p className="eyebrow">Sobre mim</p>
              <h2>Prazer, sou a <em>Dra. Patrícia Martins.</em></h2>
              <div className="txt"><p>{sobre.paragrafos[1]}</p></div>
              <ul className="credenciais">{sobre.credenciais.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="tempo" ref={tempo}>
          <div className="wrap tempo-grid">
            <div className="intro">
              <p className="eyebrow">Da gestação ao crescimento</p>
              <h2>O cuidado <em>continua.</em></h2>
              <Simbolo cor="#E89012" modo="rolagem" className="tempo-simbolo" />
            </div>
            <ol className="etapas">
              {jornada.map((p, i) => (
                <li key={p.titulo} style={{ '--i': i } as CSSProperties}>
                  <small>{p.quando}</small>
                  <h3>{p.titulo}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="servicos">
          <div className="wrap">
            <div className="sv-head">
              <div><p className="eyebrow">Serviços</p><h2>Cuidado integral, <em>no tempo certo.</em></h2></div>
            </div>
            <div className="blocos">
              {servicos.map((s, i) => {
                const cor = CORES_BLOCO[i % CORES_BLOCO.length]
                return (
                  <a key={s.slug} className="bloco" style={{ background: cor.fundo, color: cor.texto }}
                    href={s.slug === 'telemedicina' ? '#telemedicina' : linkWhatsApp(`Olá! Gostaria de saber sobre ${s.nome.toLowerCase()}.`)}>
                    <Simbolo cor={cor.marca} className="bloco-simbolo" />
                    <h3>{s.nome}</h3>
                    <span className="seta" aria-hidden="true">→</span>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        <section id="consultorio" className="sem-topo">
          <div className="wrap consult-grid">
            <div>
              <p className="eyebrow">Meu consultório</p>
              <h2>Tapete no chão, <em>brinquedos e livros.</em></h2>
              <div className="txt"><p>{consultorio[0]}</p></div>
            </div>
            <div className="brincar">
              <ArcoIris />
              <Carrossel />
            </div>
          </div>
        </section>

        <section className="abord" id="abordagem">
          <Simbolo cor={COR.creme} modo="visivel" className="abord-simbolo" />
          <div className="wrap">
            <p className="eyebrow">Minha abordagem</p>
            <h2>O caminho é fortalecer, <em>não apenas remediar.</em></h2>
            <ul className="pilares">
              <li>Menos remédio, mais cuidado</li>
              <li>Olhar além da febre e da tosse</li>
              <li>Informação que acalma</li>
              <li>Rede de apoio</li>
            </ul>
          </div>
        </section>

        <section className="depo">
          <div className="wrap">
            <figure className="depo-um">
              <Simbolo cor={COR.profunda} modo="visivel" className="depo-simbolo" />
              <blockquote>“{depoimentos[0].texto}”</blockquote>
              <figcaption>{depoimentos[0].quem}, {depoimentos[0].idade}</figcaption>
              <span className="aviso">Texto ilustrativo. Entra um depoimento real, com autorização por escrito.</span>
            </figure>
          </div>
        </section>

        <section id="duvidas">
          <div className="wrap faq-grid">
            <div id="telemedicina">
              <p className="eyebrow">Dúvidas frequentes</p>
              <h2>Seu pediatra <em>onde você estiver.</em></h2>
              <div className="tele">
                <b>Funciona muito bem online</b>
                <ul>{onlineFunciona.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
            <div><Duvidas quantas={4} primeiraAberta={false} /></div>
          </div>
        </section>

        <section className="contato" id="contato">
          <Simbolo cor={COR.creme} modo="visivel" className="contato-simbolo" />
          <div className="wrap contato-grid">
            <div>
              <p className="eyebrow">Próximo passo</p>
              <h2>Vamos cuidar <em>juntos?</em></h2>
              <div className="ctas">
                <a className="btn btn-mostarda" href={linkWhatsApp()}>Agende sua consulta</a>
                <a className="btn btn-creme" href="#telemedicina">Consulta online</a>
              </div>
            </div>
            <div className="cartao">
              <div><small>WhatsApp</small>{contato.whatsappExibicao}</div>
              <div><small>Endereço</small>{contato.endereco}</div>
              <div><small>Horários</small>{contato.horarios}</div>
              <div className="mapa"><Foto legenda="Imagem mapa" /></div>
            </div>
          </div>
        </section>
      </main>

      <Rodape simbolo="simbolo-creme" />
      <CtaFixo classeBotao="btn-mostarda" />
    </div>
  )
}

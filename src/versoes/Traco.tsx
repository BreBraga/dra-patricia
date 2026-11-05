import './traco.css'
import type { CSSProperties } from 'react'
import { consultorio, contato, depoimentos, jornada, linkWhatsApp, servicos, sobre } from '../conteudo'
import { CtaFixo, Duvidas, Foto, LinksMenu, MenuCelular, Rodape } from '../components/comum'
import { Simbolo, useProgressoRolagem } from '../marca/Simbolo'

const C = {
  creme: '#FFFBF7', petroleo: '#124353', areia: '#DFD3C8',
  coral: '#E98456', verde: '#105140', mostarda: '#E89012',
}

/** Cor de cada serviço pela linha de produto do manual (seção 06 · Cores na prática). */
const corServico: Record<string, { fundo: string; texto: string; marca: string }> = {
  'pre-natal': { fundo: C.coral, texto: C.petroleo, marca: C.creme },
  'sala-de-parto': { fundo: C.mostarda, texto: C.petroleo, marca: C.creme },
  puericultura: { fundo: C.verde, texto: C.creme, marca: C.creme },
  prematuridade: { fundo: C.petroleo, texto: C.creme, marca: C.creme },
  'pediatria-clinica': { fundo: C.petroleo, texto: C.creme, marca: C.creme },
  telemedicina: { fundo: C.creme, texto: C.petroleo, marca: C.coral },
  uti: { fundo: C.petroleo, texto: C.creme, marca: C.creme },
  palestras: { fundo: C.verde, texto: C.creme, marca: C.creme },
}

/** Versão C · O traço: o símbolo da marca é o protagonista e se desenha pela página. */
export default function Traco() {
  const jornadaRef = useProgressoRolagem<HTMLDivElement>(0.75, 0.75)

  return (
    <div className="v-traco">
      <header>
        <div className="wrap nav">
          <a className="logo" href="#inicio" aria-label="Dra. Patrícia Martins, início">
            <img src="/marca/logo-petroleo.svg" alt="Patrícia Martins · Pediatria & Neonatologia" />
          </a>
          <ul><LinksMenu /></ul>
          <div className="nav-acoes">
            <a className="btn btn-creme" href={linkWhatsApp()}>Agende sua consulta</a>
            <MenuCelular />
          </div>
        </div>
      </header>

      <main id="inicio">
        {/* Hero: o símbolo gigante se desenha ao abrir a página */}
        <section className="hero">
          <Simbolo cor={C.creme} modo="carga" className="hero-simbolo" />
          <div className="wrap hero-txt">
            <p className="eyebrow">Pediatria &amp; Neonatologia · {contato.cidade}</p>
            <h1>A pediatria <em>que fica.</em></h1>
            <p className="lead">Um traço só, da gestação ao crescimento.</p>
            <div className="ctas">
              <a className="btn btn-creme" href={linkWhatsApp('Olá! Gostaria de agendar o pré-natal pediátrico.')}>Agende seu pré-natal pediátrico</a>
              <a className="btn btn-linha" href="#telemedicina">Consulta online</a>
            </div>
          </div>
        </section>

        {/* Jornada: o traço acompanha a rolagem */}
        <section className="jornada" ref={jornadaRef}>
          <div className="wrap jornada-grid">
            <div className="jornada-fixa">
              <p className="eyebrow">Da gestação ao crescimento</p>
              <h2>O cuidado <em>continua.</em></h2>
              <Simbolo cor={C.coral} modo="rolagem" className="jornada-simbolo" />
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

        <section className="sobre" id="sobre">
          <div className="wrap sobre-grid">
            <div className="retrato">
              <Foto legenda="Dra. Patrícia Martins" src="/fotos/retrato-rindo-45.jpg" />
              <Simbolo cor={C.coral} className="retrato-selo" />
            </div>
            <div>
              <p className="eyebrow">Sobre mim</p>
              <h2>Prazer, <em>Dra. Patrícia Martins.</em></h2>
              <div className="txt"><p>{sobre.paragrafos[1]}</p></div>
              <ul className="credenciais">{sobre.credenciais.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="servicos" id="servicos">
          <div className="wrap">
            <div className="sv-head">
              <p className="eyebrow">Serviços</p>
              <h2>Oito frentes, <em>o mesmo cuidado.</em></h2>
            </div>
            <div className="posts">
              {servicos.map((s) => {
                const cor = corServico[s.slug]
                const href = s.slug === 'telemedicina' ? '#telemedicina' : linkWhatsApp(`Olá! Gostaria de saber sobre ${s.nome.toLowerCase()}.`)
                return (
                  <a key={s.slug} href={href} className="post" style={{ background: cor.fundo, color: cor.texto }}>
                    <Simbolo cor={cor.marca} className="post-marca" />
                    <span className="tag">{s.area}</span>
                    <h3>{s.nome}</h3>
                    <span className="mais">{s.slug === 'telemedicina' ? 'Como funciona →' : 'Fale comigo →'}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        <section id="consultorio">
          <div className="wrap consult">
            <div>
              <p className="eyebrow">Meu consultório</p>
              <h2>Tapete no chão, <em>sem mesa no meio.</em></h2>
              <div className="txt"><p>{consultorio[0]}</p></div>
            </div>
            <div className="galeria" aria-hidden="true">
              <div><Foto legenda="Dra. Patrícia Martins" src="/fotos/abraco-34.jpg" /></div>
              <div><Foto legenda="Imagem clínica" /></div>
            </div>
          </div>
        </section>

        <section className="abordagem" id="abordagem">
          <div className="wrap">
            <div className="citacao">
              <Simbolo cor={C.petroleo} className="citacao-marca" />
              <p className="eyebrow">Minha abordagem</p>
              <p className="frase">Menos remédio, <em>mais cuidado.</em></p>
              <p className="citacao-sub">O caminho é fortalecer, não apenas remediar.</p>
            </div>
          </div>
        </section>

        <section className="depo">
          <div className="wrap">
            <figure className="depo-um">
              <Simbolo cor={C.coral} modo="visivel" className="depo-simbolo" />
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
            </div>
            <div><Duvidas quantas={4} primeiraAberta={false} /></div>
          </div>
        </section>

        {/* Fecho: a assinatura completa, como a contracapa do manual */}
        <section className="fecho" id="contato">
          <div className="wrap">
            <div className="fecho-bloco">
              <img className="fecho-logo" src="/marca/logo-petroleo.svg" alt="Patrícia Martins · Pediatria & Neonatologia" />
              <p className="fecho-frase">Você não precisa saber tudo. <em>Só o próximo passo.</em></p>
              <div className="ctas">
                <a className="btn btn-creme" href={linkWhatsApp()}>Agende sua consulta</a>
                <a className="btn btn-linha" href="#telemedicina">Consulta online</a>
              </div>
              <div className="fecho-info">
                <div><small>WhatsApp</small>{contato.whatsappExibicao}</div>
                <div><small>Endereço</small>{contato.endereco}</div>
                <div><small>Horários</small>{contato.horarios}</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Rodape simbolo="simbolo-creme" />
      <CtaFixo classeBotao="btn-coral" />
    </div>
  )
}

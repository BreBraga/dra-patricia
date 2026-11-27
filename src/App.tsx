import './site.css'
import type { CSSProperties } from 'react'
import { abordagem, consultorio, contato, depoimentos, jornada, linkWhatsApp, sobre } from './conteudo'
import { CtaFixo, Duvidas, Foto, LinksMenu, MenuCelular, Rodape } from './components/comum'
import { Carrossel } from './components/Carrossel'
import { Servicos } from './components/Servicos'
import { Simbolo, useProgressoRolagem } from './marca/Simbolo'

/* Landing da Dra. Patrícia Martins. Estrutura e textos conforme o documento da cliente de 16/11/2026
   ("mudancas-site-programador"). As propostas A, B e C ficaram no histórico do Git (commit 6dd84f1). */

const COR = { creme: '#FBF6EE', profunda: '#124353', mostarda: '#E89012' }


/** Fotos enviadas pela cliente em 16/11 (Fotos/carrosel), recortadas em 3:4. Alternam prática e consultório. */
const GALERIA = [
  { n: 'lendo-no-chao', legenda: 'Dra. Patrícia lendo um livro no chão do consultório' },
  { n: 'bercario', legenda: 'Dra. Patrícia examinando um recém-nascido no berçário' },
  { n: 'pezinho', legenda: 'Mãos da Dra. Patrícia segurando o pezinho de um bebê' },
  { n: 'tablet', legenda: 'Dra. Patrícia com o Tratado de Pediatria no tablet' },
  { n: 'nascimento', legenda: 'Recém-nascido recebido na sala de parto' },
  { n: 'com-criancas', legenda: 'Dra. Patrícia com duas crianças no consultório' },
  { n: 'crianca-brincando', legenda: 'Criança brincando no painel de frutas do consultório' },
  { n: 'gemeos', legenda: 'Mãe com gêmeos recém-nascidos' },
  { n: 'sling', legenda: 'Dra. Patrícia com um bebê no sling' },
  { n: 'bebe-brinquedo', legenda: 'Bebê brincando com um polvo de pelúcia' },
]

export default function App() {
  const tempo = useProgressoRolagem<HTMLElement>(0.75, 0.75)
  const registro = contato.crm.replace(/^CRM-?/, '')

  return (
    <div className="site">
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
        {/* 1) Quem eu sou: layout B, texto A */}
        <section className="hero">
          <Simbolo cor={COR.creme} modo="carga" className="hero-simbolo" />
          <div className="wrap hero-grid">
            <div className="txt">
              <p className="eyebrow">Pediatra e Neonatologista<span className="eyebrow-cidade"> · {contato.cidade}</span></p>
              <h1>A pediatria <em>que fica.</em></h1>
              <p className="lead">Ciência, escuta e acolhimento para cada fase do seu filho. Acompanho sua família desde a gestação, passando pela sala de parto, até o crescimento.</p>
              <div className="ctas">
                <a className="btn btn-mostarda" href={linkWhatsApp('Olá! Gostaria de agendar o pré-natal pediátrico.')}>Agende seu pré-natal pediátrico</a>
                <a className="btn btn-creme" href="#telemedicina">Consulta online</a>
              </div>
              <div className="selos">
                <div><b>18</b>anos de pediatria</div>
                <div><b>CRM</b>{registro}</div>
                <div><b>IFF</b>Mestrado Fiocruz</div>
              </div>
            </div>
            {/* foto enviada pela cliente em 16/11 (Fotos/IMG_9897.PNG), recortada em 3:4; no celular a moldura é mais quadrada e o recorte sobe para manter o rosto */}
            <div className="arco"><Foto legenda="Dra. Patrícia Martins" src="/fotos/retrato-hero.jpg" posicao="50% 18%" prioridade /></div>
          </div>
        </section>

        <div className="manifesto wrap">
          <Simbolo cor={COR.profunda} modo="visivel" className="manifesto-simbolo" />
          <p>Família preparada é <em>família segura.</em></p>
        </div>

        {/* 2) Prazer: layout B, texto A literal */}
        <section className="sobre" id="sobre">
          <div className="wrap sobre-grid">
            {/* foto enviada pela cliente em 16/11 (Fotos/IMG_9899.PNG), em 4:5, com um pouco de parede acrescentada no topo para o cabelo não encostar no arco */}
            <div className="fotos-sobre">
              <div className="a1"><Foto legenda="Dra. Patrícia Martins" src="/fotos/sobre.jpg" /></div>
              {/* três círculos ao redor da foto principal: dois enviados pela cliente em 16/11 e o das mãos, que já estava */}
              <div className="circ c1"><Foto legenda="Dra. Patrícia na sala de parto" src="/fotos/circulo-sala-de-parto.jpg" /></div>
              <div className="circ c2"><Foto legenda="Dra. Patrícia com uma criança no colo, no consultório" src="/fotos/circulo-consultorio.jpg" /></div>
              <div className="circ c3"><Foto legenda="Mãos da Dra. Patrícia segurando o pezinho de um bebê" src="/fotos/maos-bebe-quadrada.jpg" /></div>
            </div>
            <div>
              <p className="eyebrow">Sobre mim</p>
              <h2>Prazer, Dra. Patrícia Martins. <em>Pediatria com vínculo.</em></h2>
              <div className="txt">
                {[sobre.paragrafos[0], sobre.paragrafos[1], sobre.paragrafos[3]].map((p) => <p key={p}>{p}</p>)}
              </div>
              <dl className="formacao">
                {sobre.formacao.map((f) => (
                  <div key={f.titulo}><dt>{f.titulo}</dt><dd>{f.texto}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 3) Da gestação ao crescimento: igual à B, sem fotos */}
        <section className="tempo" ref={tempo}>
          <div className="wrap tempo-grid">
            <div className="intro">
              <p className="eyebrow">Da gestação ao crescimento</p>
              <h2>O cuidado <em>continua.</em></h2>
              <Simbolo cor={COR.mostarda} modo="rolagem" className="tempo-simbolo" />
            </div>
            <ol className="etapas">
              {jornada.map((p, i) => (
                <li key={p.titulo} style={{ '--i': i } as CSSProperties}>
                  <small>{p.quando}</small>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4) Serviços: 4 cores da identidade (2 serviços cada); pré-natal em destaque, os outros só com nome e frase */}
        <section id="servicos">
          <div className="wrap">
            <div className="sv-head">
              <div><p className="eyebrow">Serviços</p><h2>Cuidado integral, <em>do início.</em></h2></div>
              <p>Todos os atendimentos com abordagem individualizada, menos medicalizada e baseada em evidências atualizadas.</p>
            </div>
            <Servicos />
          </div>
        </section>

        {/* transição entre serviços e consultório: a prática e o consultório lado a lado, 4 fotos por vez */}
        <section className="galeria sem-topo" aria-label="Fotos da prática e do consultório">
          <div className="wrap">
            <Carrossel rotulo="Fotos da prática e do consultório" classe="carrossel-fotos" intervalo={4000}
              itens={GALERIA.map((f) => ({ chave: f.n, conteudo: <Foto legenda={f.legenda} src={`/fotos/galeria/${f.n}.jpg`} /> }))} />
          </div>
        </section>

        {/* 5) Meu consultório: design B sem o arco-íris, texto A; foto da sala enviada pela cliente em 16/11 */}
        <section id="consultorio" className="sem-topo">
          <div className="wrap consult-grid">
            <div>
              <p className="eyebrow">Meu consultório</p>
              <h2>Onde a consulta <em>vira brincadeira.</em></h2>
              <div className="txt">{consultorio.slice(0, 2).map((p) => <p key={p}>{p}</p>)}</div>
              {/* as palavras não ficam paradas: cada uma numa cor da marca, balançando no seu ritmo */}
              <p className="citacao" aria-label="Criança não foi feita para ficar parada.">
                {'Criança não foi feita para ficar parada.'.split(' ').map((p, i) => (
                  <span key={i} aria-hidden="true" style={{ '--i': i } as CSSProperties}>{p}</span>
                ))}
              </p>
            </div>
            <div className="consult-foto">
              <Foto legenda="Sala do consultório, com tapete redondo no chão, brinquedos nas prateleiras e janela ampla" src="/fotos/consultorio.jpg" />
            </div>
          </div>
        </section>

        {/* 6) Minha abordagem: layout B, texto A */}
        <section className="abord" id="abordagem">
          <Simbolo cor={COR.creme} modo="visivel" className="abord-simbolo" />
          <div className="wrap">
            <p className="eyebrow">Minha abordagem</p>
            <h2>Ver além da <em>febre e da tosse.</em></h2>
            <div className="abord-grid">
              <div className="col">
                <h3>A pediatria <em>do futuro</em></h3>
                <p>{abordagem.futuro}</p>
                <ul className="pilares">{abordagem.futuroItens.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              <div className="col">
                <h3>Menos remédio, <em>mais cuidado</em></h3>
                <p>{abordagem.menosRemedio[0]}</p>
                <p>{abordagem.menosRemedio[2]}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7) Depoimentos: carrossel com setas e link para as avaliações no Google */}
        <section className="depo">
          <div className="wrap">
            <Simbolo cor={COR.profunda} modo="visivel" className="depo-simbolo" />
            <Carrossel rotulo="Depoimentos de famílias" classe="carrossel-depo"
              itens={depoimentos.map((d) => ({
                chave: d.quem,
                conteudo: (
                  <figure className="depo-um">
                    <blockquote>“{d.texto}”</blockquote>
                    <figcaption>{d.quem} · avaliação no Google</figcaption>
                  </figure>
                ),
              }))} />
            <div className="depo-rodape">
              <a className="btn btn-google" href={contato.googleAvaliacoes} target="_blank" rel="noopener noreferrer">
                Ver avaliações no Google <span aria-hidden="true">↗</span><span className="sr">(abre em nova aba)</span>
              </a>
              <p className="nota-google"><b>5,0</b> <span aria-hidden="true">★★★★★</span> 32 avaliações no Google</p>
            </div>
          </div>
        </section>

        {/* 8) Dúvidas frequentes: versão A, completa */}
        <section id="duvidas">
          <div className="wrap faq-grid">
            <div id="telemedicina">
              <p className="eyebrow">Dúvidas frequentes</p>
              <h2>Telemedicina: seu pediatra <em>onde você estiver.</em></h2>
              <p className="faq-intro">Sem trânsito, sem sala de espera e sem o risco de pegar outra doença. Com o mesmo cuidado da consulta presencial.</p>
            </div>
            <div><Duvidas /></div>
          </div>
        </section>

        {/* 9) Próximo passo: versão C */}
        <section className="fecho" id="contato">
          <div className="wrap">
            <div className="fecho-bloco">
              <img className="fecho-logo" src="/marca/logo-petroleo.svg" alt="Patrícia Martins · Pediatria & Neonatologia" />
              <p className="fecho-frase">Você não precisa saber tudo. <em>Só o próximo passo.</em></p>
              <div className="ctas">
                <a className="btn btn-creme-cheio" href={linkWhatsApp()}>Agende sua consulta</a>
                <a className="btn btn-linha-escura" href="#telemedicina">Consulta online</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Rodape />
      <CtaFixo classeBotao="btn-mostarda" />
    </div>
  )
}

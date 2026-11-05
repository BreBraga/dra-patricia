import './marca.css'
import { abordagem, consultorio, contato, depoimentos, jornada, linkWhatsApp, servicos, sobre } from '../conteudo'
import { CtaFixo, Duvidas, Foto, LinksMenu, MenuCelular, Rodape } from '../components/comum'

/** Versão A · Marca: fiel ao manual. Linho, petróleo e laranja como faísca. */
export default function Marca() {
  return (
    <div className="v-marca">
      <header>
        <div className="wrap nav">
          <a className="logo" href="#inicio" aria-label="Dra. Patrícia Martins, início">
            <img src="/marca/logo-laranja.svg" alt="Patrícia Martins · Pediatria & Neonatologia" />
          </a>
          <ul><LinksMenu /></ul>
          <div className="nav-acoes">
            <a className="btn btn-laranja" href={linkWhatsApp()}>Agende sua consulta</a>
            <MenuCelular />
          </div>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Pediatra e Neonatologista · {contato.cidade}</p>
              <h1>A pediatria <em>que fica.</em></h1>
              <p className="lead">Ciência, escuta e acolhimento para cada fase do seu filho. Acompanho sua família desde a gestação, passando pela sala de parto, até o crescimento.</p>
              <div className="ctas">
                <a className="btn btn-laranja" href={linkWhatsApp('Olá! Gostaria de agendar o pré-natal pediátrico.')}>Agende seu pré-natal pediátrico</a>
                <a className="btn btn-linha" href="#telemedicina">Consulta online</a>
              </div>
              <p className="assin">16 anos de pediatria · Mestrado IFF/Fiocruz · Reanimação neonatal SBP</p>
            </div>
            <div className="mosaic" aria-hidden="true">
              <div className="m-foto"><Foto legenda="Dra. Patrícia Martins" src="/fotos/retrato-rindo.jpg" /></div>
              <div className="m-laranja"><img src="/marca/simbolo-creme.svg" alt="" /></div>
              <div className="m-petroleo"><b>16</b><span>anos acompanhando famílias</span></div>
              <div className="m-areia"><img src="/marca/simbolo-laranja.svg" alt="" style={{ width: 46 }} /><p>Família preparada é <em>família segura.</em></p></div>
            </div>
          </div>
        </section>

        <section className="sem-topo">
          <div className="wrap">
            <div className="jornada">
              <p className="eyebrow claro">Da gestação ao crescimento</p>
              <h2>Uma mesma pediatra em <em>cada etapa.</em></h2>
              <ol className="passos">
                {jornada.map((p) => (
                  <li className="passo" key={p.titulo}><small>{p.quando}</small><b>{p.titulo}</b><p>{p.texto}</p></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="sobre" id="sobre">
          <div className="wrap sobre-grid">
            <div className="retrato"><Foto legenda="Dra. Patrícia Martins" src="/fotos/sentada-bege-45.jpg" /></div>
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

        <section className="servicos" id="servicos">
          <div className="wrap">
            <div className="sv-head">
              <div><p className="eyebrow">Serviços</p><h2>Cuidado integral, <em>do início.</em></h2></div>
              <p>Todos os atendimentos com abordagem individualizada, menos medicalizada e baseada em evidências atualizadas.</p>
            </div>
            <div className="cards">
              {servicos.map((s, i) => {
                const classe = i === 0 ? 'card destaque' : s.slug === 'palestras' ? 'card coral' : 'card'
                const href = s.slug === 'telemedicina' ? '#telemedicina' : linkWhatsApp(`Olá! Gostaria de saber sobre ${s.nome.toLowerCase()}.`)
                return (
                  <a className={classe} href={href} key={s.slug}>
                    <span className="tag">{s.area}</span>
                    <h3>{s.nome}</h3>
                    <p>{i === 0 ? s.resumo : s.frase}</p>
                    <span className="mais">{i === 0 ? 'Entre 28 e 34 semanas →' : s.slug === 'telemedicina' ? 'Como funciona →' : 'Fale comigo →'}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        <section id="consultorio">
          <div className="wrap consult">
            <div className="galeria" aria-hidden="true">
              <div><Foto legenda="Dra. Patrícia Martins" src="/fotos/maos-bebe-alta.jpg" /></div>
              <div><Foto legenda="Imagem clínica" /></div>
              <div><Foto legenda="Dra. Patrícia Martins" src="/fotos/abraco-quadrado.jpg" /></div>
            </div>
            <div>
              <p className="eyebrow">Meu consultório</p>
              <h2>Onde a consulta <em>vira brincadeira.</em></h2>
              <div className="txt">{consultorio.slice(0, 2).map((p) => <p key={p}>{p}</p>)}</div>
              <p className="citacao">Criança não foi feita para ficar parada.</p>
            </div>
          </div>
        </section>

        <section id="abordagem" className="sem-topo">
          <div className="wrap">
            <div className="abord-head"><p className="eyebrow">Minha abordagem</p><h2>Ver além da <em>febre e da tosse.</em></h2></div>
            <div className="abord-grid">
              <div className="bloco b1">
                <h3>A pediatria <em>do futuro</em></h3>
                <p>{abordagem.futuro}</p>
                <ul>{abordagem.futuroItens.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              <div className="bloco b2">
                <h3>Menos remédio, <em>mais cuidado</em></h3>
                <p>{abordagem.menosRemedio[0]}</p>
                <p>{abordagem.menosRemedio[2]}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="depo">
          <div className="wrap">
            <p className="eyebrow">Famílias acompanhadas</p>
            <h2>O que dizem <em>as famílias.</em></h2>
            <span className="aviso">Textos ilustrativos. Entram os depoimentos reais, com autorização por escrito.</span>
            <div className="depo-grid">
              {depoimentos.map((d) => (
                <figure key={d.quem}><blockquote>“{d.texto}”</blockquote><figcaption>{d.quem}, {d.idade}</figcaption></figure>
              ))}
            </div>
          </div>
        </section>

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

        <section className="contato" id="contato">
          <div className="wrap">
            <div className="cta-final">
              <div>
                <p className="eyebrow claro">Próximo passo</p>
                <h2>Você não precisa saber tudo. <em>Só o próximo passo.</em></h2>
                <p>Agende pelo WhatsApp uma consulta presencial no consultório ou online, de onde você estiver.</p>
                <div className="ctas">
                  <a className="btn btn-laranja" href={linkWhatsApp()}>Agende sua consulta</a>
                  <a className="btn btn-linha" href="#telemedicina">Consulta online</a>
                </div>
              </div>
              <div className="info">
                <div><small>WhatsApp</small>{contato.whatsappExibicao}</div>
                <div><small>Endereço</small>{contato.endereco}</div>
                <div><small>Horários</small>{contato.horarios}</div>
                <div className="mapa"><Foto legenda="Imagem mapa" /></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Rodape simbolo="simbolo-laranja" />
      <CtaFixo classeBotao="btn-laranja" />
    </div>
  )
}

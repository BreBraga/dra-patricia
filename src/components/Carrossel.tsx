import { useEffect, useRef, useState, type ReactNode } from 'react'

type Item = { chave: string; conteudo: ReactNode }

/** Carrossel com rolagem nativa (arrasta no dedo e no mouse), setas, pontinhos e, se pedido,
 *  passagem automática. A passagem automática para quando o mouse ou o foco estão no carrossel,
 *  tem botão de pausar e não liga para quem pediu menos movimento no sistema. */
export function Carrossel({ itens, rotulo, classe, intervalo }: {
  itens: Item[]
  rotulo: string
  classe?: string
  /** milissegundos entre uma foto e outra; sem valor, só anda quando a pessoa mexe */
  intervalo?: number
}) {
  const trilho = useRef<HTMLDivElement>(null)
  const [atual, setAtual] = useState(0)
  const [noFim, setNoFim] = useState(false)
  const [paradas, setParadas] = useState(itens.length)
  const [pausado, setPausado] = useState(false)
  const [emUso, setEmUso] = useState(false)
  const [poucoMovimento, setPoucoMovimento] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPoucoMovimento(mq.matches)
    const mudar = () => setPoucoMovimento(mq.matches)
    mq.addEventListener('change', mudar)
    return () => mq.removeEventListener('change', mudar)
  }, [])

  useEffect(() => {
    const el = trilho.current
    if (!el) return
    const medir = () => {
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0
      const passo = ((el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1) + gap
      const visiveis = Math.max(1, Math.floor((el.clientWidth + gap) / passo))
      const total = Math.max(1, itens.length - visiveis + 1)
      const fim = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      setParadas(total)
      setNoFim(fim)
      setAtual(fim ? total - 1 : Math.round(el.scrollLeft / passo))
    }
    medir()
    el.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => { el.removeEventListener('scroll', medir); window.removeEventListener('resize', medir) }
  }, [itens.length])

  const irPara = (i: number) => {
    const el = trilho.current
    const slide = el?.children[i] as HTMLElement | undefined
    if (!el || !slide) return
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: poucoMovimento ? 'auto' : 'smooth' })
  }

  const automatico = !!intervalo && !poucoMovimento
  useEffect(() => {
    if (!automatico || pausado || emUso) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      irPara(noFim ? 0 : atual + 1)
    }, intervalo)
    return () => window.clearInterval(id)
  })

  return (
    <div className={`carrossel${classe ? ` ${classe}` : ''}`} role="region" aria-roledescription="carrossel" aria-label={rotulo}
      onPointerEnter={() => setEmUso(true)} onPointerLeave={() => setEmUso(false)}
      onFocus={() => setEmUso(true)} onBlur={() => setEmUso(false)}>
      <div className="trilho" ref={trilho} tabIndex={0} aria-live={automatico && !pausado ? 'off' : 'polite'}>
        {itens.map((item, i) => (
          <div className="slide" key={item.chave} role="group" aria-roledescription="item" aria-label={`${i + 1} de ${itens.length}`}>
            {item.conteudo}
          </div>
        ))}
      </div>
      <div className="carrossel-nav">
        <button type="button" aria-label="Anterior" disabled={atual === 0} onClick={() => irPara(atual - 1)}>←</button>
        <div className="pontos">
          {itens.slice(0, paradas).map((item, i) => (
            <button type="button" key={item.chave} aria-label={`Ir para o item ${i + 1}`} aria-current={i === atual}
              className={i === atual ? 'ativo' : undefined} onClick={() => irPara(i)} />
          ))}
          {automatico && (
            <button type="button" className="pausar" aria-label={pausado ? 'Continuar a passagem automática' : 'Pausar a passagem automática'}
              onClick={() => setPausado((p) => !p)}>{pausado ? '▶' : '❚❚'}</button>
          )}
        </div>
        <button type="button" aria-label="Próximo" disabled={noFim} onClick={() => irPara(atual + 1)}>→</button>
      </div>
    </div>
  )
}

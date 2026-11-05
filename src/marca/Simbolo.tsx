import { useEffect, useRef, type CSSProperties } from 'react'
import { ESPESSURA, PONTOS, TRACO, TRECHOS, VIEWBOX } from './simbolo-dados'

export type Trecho = keyof typeof TRECHOS

type Props = {
  cor: string
  /** Trecho realçado (p, m ou bebê). Os outros ficam em `corApagada`. */
  destaque?: Trecho
  corDestaque?: string
  corApagada?: string
  /**
   * Como o traço aparece:
   * - 'carga': desenha uma vez ao abrir a página
   * - 'visivel': desenha quando entra na tela
   * - 'rolagem': segue a variável CSS --p (0 a 1) definida por quem usa
   * - 'pronto': já desenhado
   */
  modo?: 'carga' | 'visivel' | 'rolagem' | 'pronto'
  className?: string
  style?: CSSProperties
  titulo?: string
}

/**
 * O símbolo da marca com o traço original. Nada é redesenhado: só muda a cor e
 * quanto do caminho está visível (pathLength=1 deixa o traçado de 0 a 1).
 */
export function Simbolo({ cor, destaque, corDestaque, corApagada, modo = 'pronto', className = '', style, titulo }: Props) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (modo !== 'visivel' || !ref.current) return
    const el = ref.current
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('desenhando')
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [modo])

  const traco = { fill: 'none', strokeWidth: ESPESSURA, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

  return (
    <svg
      ref={ref}
      viewBox={VIEWBOX}
      className={`simbolo simbolo-${modo} ${className}`}
      style={style}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      {destaque ? (
        <>
          <path d={TRACO} stroke={corApagada ?? cor} {...traco} />
          <path d={TRECHOS[destaque]} stroke={corDestaque ?? cor} pathLength={1} className="traco" {...traco} />
        </>
      ) : (
        <>
          <path d={TRACO} stroke={cor} pathLength={1} className="traco" {...traco} />
          {PONTOS.map((d) => <path key={d.slice(0, 24)} d={d} fill={cor} fillRule="evenodd" className="ponto" />)}
        </>
      )}
    </svg>
  )
}

/** Progresso de rolagem de um elemento (0 quando entra, 1 quando sai) em --p. */
export function useProgressoRolagem<T extends HTMLElement>(inicio = 0.85, fim = 0.35) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1')
      return
    }
    let raf = 0
    const medir = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const a = innerHeight * inicio
      const b = innerHeight * fim - r.height
      const p = Math.min(1, Math.max(0, (a - r.top) / (a - b)))
      el.style.setProperty('--p', p.toFixed(4))
    }
    const agendar = () => { if (!raf) raf = requestAnimationFrame(medir) }
    medir()
    addEventListener('scroll', agendar, { passive: true })
    addEventListener('resize', agendar)
    return () => {
      removeEventListener('scroll', agendar)
      removeEventListener('resize', agendar)
      cancelAnimationFrame(raf)
    }
  }, [inicio, fim])
  return ref
}

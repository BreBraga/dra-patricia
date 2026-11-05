import { useEffect, useState } from 'react'
import Marca from './versoes/Marca'
import Natureza from './versoes/Natureza'
import Traco from './versoes/Traco'

const versoes = [
  { id: 'a', nome: 'A · Marca', titulo: 'Laranja e petróleo, fiel ao manual' },
  { id: 'b', nome: 'B · Natureza', titulo: 'Petróleo, areia e mostarda, fotos em arco' },
  { id: 'c', nome: 'C · O traço', titulo: 'O símbolo da marca como protagonista' },
] as const

type IdVersao = (typeof versoes)[number]['id']

function versaoDaUrl(): IdVersao {
  const v = new URLSearchParams(location.search).get('v')
  return versoes.some((x) => x.id === v) ? (v as IdVersao) : 'a'
}

/** Seletor só para a apresentação à cliente. Some da versão final. */
function Seletor({ atual, trocar }: { atual: IdVersao; trocar: (v: IdVersao) => void }) {
  const [recolhido, setRecolhido] = useState(false)
  return (
    <div className={`seletor${recolhido ? ' recolhido' : ''}`} role="group" aria-label="Versão da página">
      {!recolhido &&
        versoes.map((v) => (
          <button key={v.id} type="button" title={v.titulo} aria-pressed={atual === v.id} onClick={() => trocar(v.id)}>
            {v.nome}
          </button>
        ))}
      <button type="button" className="seletor-toggle" onClick={() => setRecolhido((r) => !r)} aria-label={recolhido ? 'Mostrar versões' : 'Esconder versões'}>
        {recolhido ? 'Versões' : '×'}
      </button>
    </div>
  )
}

export default function App() {
  const [versao, setVersao] = useState<IdVersao>(versaoDaUrl)

  useEffect(() => {
    const voltar = () => setVersao(versaoDaUrl())
    addEventListener('popstate', voltar)
    return () => removeEventListener('popstate', voltar)
  }, [])

  const trocar = (v: IdVersao) => {
    if (v === versao) return
    history.pushState(null, '', `?v=${v}`)
    setVersao(v)
    scrollTo({ top: 0 })
  }

  return (
    <>
      {versao === 'a' && <Marca />}
      {versao === 'b' && <Natureza />}
      {versao === 'c' && <Traco />}
      <Seletor atual={versao} trocar={trocar} />
    </>
  )
}

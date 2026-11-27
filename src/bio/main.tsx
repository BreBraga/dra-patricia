import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '../index.css'
import Bio from './Bio'

// no build o HTML já vem pronto (scripts/prerender.mjs) e o React só assume; no `npm run dev` monta do zero
const raiz = document.getElementById('root')!
const pagina = <StrictMode><Bio /></StrictMode>
if (raiz.hasChildNodes()) hydrateRoot(raiz, pagina)
else createRoot(raiz).render(pagina)

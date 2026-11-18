import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Bio from './Bio'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Bio />
  </StrictMode>,
)

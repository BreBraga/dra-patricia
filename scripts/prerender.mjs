// Roda depois do `vite build`: põe o HTML já renderizado das páginas em dist/ (o React só "hidrata" no navegador),
// injeta os dados estruturados (JSON-LD) e gera robots.txt e sitemap.xml.
// Com o domínio definido (SITE_URL=https://... npm run build) entram canonical, og:url, og:image e o sitemap.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(raiz, 'dist')
const ssr = join(raiz, 'dist-ssr')
const { renderSite, renderBio, dadosEstruturados } = await import(pathToFileURL(join(ssr, 'entry-server.js')).href)

const site = (process.env.SITE_URL || '').trim().replace(/\/$/, '')
const RAIZ_VAZIA = '<div id="root"></div>'

async function montar(arquivo, html, cabeca) {
  const caminho = join(dist, arquivo)
  let doc = await readFile(caminho, 'utf8')
  if (!doc.includes(RAIZ_VAZIA)) throw new Error(`${arquivo}: não achei ${RAIZ_VAZIA}`)
  doc = doc.replace(RAIZ_VAZIA, `<div id="root">${html}</div>`).replace('</head>', `${cabeca}\n  </head>`)
  await writeFile(caminho, doc)
}

const jsonLd = dadosEstruturados(site || undefined).replace(/</g, '\u003c')
const cabecaSite = [
  site && `<link rel="canonical" href="${site}/" />`,
  site && `<meta property="og:url" content="${site}/" />`,
  site && `<meta property="og:image" content="${site}/og-image.jpg" />`,
  site && '<meta property="og:image:width" content="1200" />',
  site && '<meta property="og:image:height" content="630" />',
  site && '<meta property="og:image:alt" content="Dra. Patrícia Martins, pediatra e neonatologista em Volta Redonda" />',
  site && `<meta name="twitter:image" content="${site}/og-image.jpg" />`,
  `<script type="application/ld+json">${jsonLd}</script>`,
].filter(Boolean).map((l) => '    ' + l).join('\n')

await montar('index.html', renderSite(), cabecaSite)
await montar('bio/index.html', renderBio(), site ? `    <link rel="canonical" href="${site}/bio/" />` : '')

await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${site}/sitemap.xml\n` : ''}`)
if (site) {
  const hoje = new Date().toISOString().slice(0, 10)
  await writeFile(join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site}/</loc><lastmod>${hoje}</lastmod></url>\n</urlset>\n`)
}

await rm(ssr, { recursive: true, force: true })
console.log(`prerender ok${site ? ` (${site})` : ' (sem SITE_URL: canonical, og:url, og:image e sitemap ficaram de fora)'}`)

# Dra. Patrícia Martins · Landing page

Landing page da Dra. Patrícia Martins, Pediatra e Neonatologista (Volta Redonda, RJ).
Projeto da Linkeed em React + Vite + TypeScript.

## Estrutura

- `src/App.tsx`: a página, seção por seção (estrutura do documento da cliente de 16/11/2026).
- `src/site.css`: cores, tipografia e layout. `src/index.css`: base global, símbolo animado e menu do celular.
- `src/conteudo.ts`: todos os textos e dados de contato.
- `src/components/`: foto, carrossel, dúvidas, menu e rodapé. `src/marca/`: símbolo da marca com o traço animado.

As propostas anteriores (A · Marca, B · Natureza, C · O traço) estão no histórico do Git, no commit `6dd84f1`.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/ com o HTML já renderizado, JSON-LD, robots.txt (e sitemap com SITE_URL)
npm run preview  # serve o build em http://localhost:4173
```

## Pendências

- Dados de contato, CRM/RQE, endereço, horários e link das avaliações no Google são provisórios (marcados `PENDENTE` em `src/conteudo.ts`).
- Fotos: topo, Sobre e galeria já são as enviadas pela cliente (originais em `../Fotos`). Falta a foto de cada serviço; `maos-bebe-quadrada.jpg` (círculo do Sobre) ainda é do Instagram.
- Fotos com rosto de criança ou paciente precisam de autorização por escrito (regras do CFM).
- Elemento que substitui o arco-íris no consultório: a definir com a cliente.
- Domínio: quando existir, buildar com `SITE_URL=https://dominio npm run build` (na Vercel, variável de ambiente `SITE_URL`). Sem ele ficam de fora canonical, `og:url`, `og:image` e o `sitemap.xml`.
- Depoimentos são ilustrativos. Imagens com pacientes e depoimentos precisam de autorização por escrito (regras do CFM).

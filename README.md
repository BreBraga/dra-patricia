# Dra. Patrícia Martins · Landing page

Exemplos de landing page para a Dra. Patrícia Martins, Pediatra e Neonatologista (Volta Redonda, RJ).
Projeto da Linkeed em React + Vite + TypeScript.

## Versões

Um único app com três propostas, trocadas pelo parâmetro `?v=` (ou pelo seletor no canto da tela):

| Parâmetro | Versão |
|---|---|
| `?v=a` | A · Marca |
| `?v=b` | B · Natureza |
| `?v=c` | C · O traço |

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/
npm run preview  # serve o build em http://localhost:4173
```

## Pendências

- Dados de contato, CRM/RQE, endereço e horários são provisórios (marcados `PENDENTE` em `src/conteudo.ts`).
- As fotos em `public/fotos/` são provisórias, tiradas do Instagram da Dra. Patrícia. Trocar pelos originais das sessões de foto.
- Depoimentos são ilustrativos. Imagens com pacientes e depoimentos precisam de autorização por escrito (regras do CFM).

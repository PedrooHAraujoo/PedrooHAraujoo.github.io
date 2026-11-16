# Portfólio · Pedro Henrique Araújo Souza

Site de portfólio e currículo em PDF, os dois saindo da mesma fonte de dados.

No ar: https://pedrooharaujoo.github.io

- **Site**: Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 4, exportado como site estático (`out/`).
- **Idiomas**: português em `/` e inglês em `/en/`.
- **Currículo**: páginas `/curriculo/` e `/en/resume/`, em coluna única e texto real (formato que os sistemas de triagem leem), impressas em PDF por script.
- **Sem rastreadores** e sem JavaScript obrigatório: o conteúdo já chega pronto no HTML; o script só cuida das animações de entrada.

## Onde editar

| O que mudar | Arquivo |
| --- | --- |
| Nome, resumo, contatos, experiências, formação, competências | `src/content/profile.ts` |
| Versão curta para o currículo de uma página | `src/content/cv.ts` |
| Estudos de caso (texto, números, links, stack) | `src/content/projects.ts` |
| Rótulos da interface em PT e EN | `src/lib/i18n.ts` |
| Cores, tipografia e estilos do currículo | `src/app/globals.css` |

Cada número citado nos casos tem a origem anotada no campo `source` (histórico do git, migrações, relatório de teste). Se um projeto mudar, atualize o número e a origem juntos.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera a pasta out/
```

## Regerar imagens e PDFs

Os scripts usam o Edge já instalado no Windows, aberto em modo headless:

```bash
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --remote-debugging-port=9333 --user-data-dir=%TEMP%\edge-portfolio about:blank
```

Com ele aberto:

```bash
npm run capture                    # telas dos projetos no ar -> public/shots
node scripts/brand-images.mjs      # public/og.png e a capa do LinkedIn
npm run build && npx http-server out -p 3401
npm run cv                         # public/cv/*.pdf (uma página cada)
npm run build                      # inclui os PDFs novos em out/
```

`npm run cv` avisa quantas páginas cada PDF tem. Se passar de uma, enxugue `src/content/cv.ts`.

## Publicar

O site é estático, então serve em qualquer hospedagem de arquivos.

- **Vercel**: importar o repositório; o build padrão já funciona.
- **GitHub Pages** (em uso): `npm run deploy` compila e envia a pasta `out/` para o ramo `gh-pages` deste repositório.

O endereço público fica em `.env.production` (`NEXT_PUBLIC_SITE_URL`). Se o domínio mudar, troque lá e gere tudo de novo: é essa variável que alimenta o canonical, o sitemap, a imagem de compartilhamento e a linha do portfólio no currículo.

# Sistema de Sorteio Simples

Descrição
- Ferramenta leve para realizar sorteios de participantes/itens (AOE's João Pessoa). Interface web simples que permite colar ou importar uma lista, escolher a quantidade de vencedores, sortear, copiar e exportar os resultados.

Arquivos principais
- `index.html` — interface do usuário e marcação semântica.
- `style.css` — estilos responsivos e tema (variáveis em `:root`).
- `script.js` — lógica do sorteio (parsing, embaralhamento Fisher‑Yates), importação CSV, cópia e exportação, e animação de confete.

Instalação / Como executar
1. Abra a pasta do projeto no seu computador.
2. Abra `index.html` em um navegador moderno (Chrome, Edge, Firefox).

Uso básico
1. Cole ou insira a lista de participantes no campo principal (valores separados por vírgula ou por linha).
2. Ajuste a `Quantidade de vencedores` (padrão: 15).
3. Use os controles em **Controles**:
   - `Importar` (ícone de arquivo): carregar um arquivo `.csv` ou texto com itens separados por vírgula/linha.
   - `Limpar`: limpar campo de entrada e resultados.
   - `Sortear`: executar o sorteio e exibir vencedores.
4. No painel de resultados, você pode `Copiar` (para área de transferência) ou `Exportar CSV`.

Formatos aceitos na importação
- CSV simples ou texto com valores separados por vírgula.
- Valores também podem estar em linhas separadas. Exemplo válido:
  - `1,2,3,4` ou
  - `1\n2\n3\n4`
- Valores duplicados são removidos automaticamente antes do sorteio.

Como o sorteio funciona
- O sistema faz parsing dos valores, remove duplicatas e valida se há participantes suficientes para o número de vencedores selecionado.
- Embaralhamento: algoritmo Fisher‑Yates para garantir aleatoriedade justa.
- Os primeiros `N` itens do pool embaralhado são considerados vencedores.

Acessibilidade e responsividade
- Elementos possuem atributos ARIA mínimos (`aria-live`, `role=main`) para feedback por leitores de tela.
- O layout é responsivo com breakpoints principais em 900px, 700px e 480px para dispositivos móveis.

Personalização rápida
- Cores e variáveis ficam em `:root` dentro de `style.css` — altere `--accent`, `--accent-2` e `--bg-1` para ajustar branding.
- Substitua `sebrae.webp` pelo logotipo desejado (mantendo o mesmo nome de arquivo ou atualize o `src` em `index.html`).

Resolução de problemas
- Se `Copiar` não funcionar: verifique permissões do navegador para Clipboard; teste no Chrome/Edge atualizados.
- Se `Importar` não carregar nada: abra DevTools (F12) e verifique se há erros no console; confirme que o arquivo é `.csv` ou texto simples.

Próximos passos recomendados
- Adicionar tema escuro (CSS), testes automáticos e validação avançada de entradas (ex.: remover espaços e caracteres inválidos).
- Implementar deploy simples via GitHub Pages ou servidor estático.

Licença e créditos
- Coloque aqui a licença desejada (ex.: MIT) e os créditos do desenvolvedor/design.

---

Se quiser, eu adapto este `README.md` para incluir instruções de deploy (GitHub Pages) ou exemplos de entrada/saída mais detalhados.

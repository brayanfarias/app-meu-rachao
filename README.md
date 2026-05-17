# MeuRachao – README

## Nome da plataforma

- **Nome proposto:** `MeuRachao`
- **Justificativa curta:**
    - Conecta diretamente com a expressão já usada na cultura esportiva brasileira para jogos informais (“rachão”, “racha”), facilitando entendimento imediato do propósito da plataforma
    - O prefixo “Meu” reforça a ideia de posse e personalização (“meu grupo”, “meu horário”, “meu rachão de vôlei”), aproximando o produto do organizador e dos jogadores.
    - Mantém o nome suficientemente genérico para, no futuro, suportar outros esportes de rachão, ainda que o foco inicial seja o voleibol, reduzindo a necessidade de rebranding em fases posteriores.

---

## Visão geral

- **MeuRachao** é uma plataforma web (mobile‑first) para organizar rachões de voleibol recreativo em esquema tático 6x0.
- **Foco principal:**
    - Grupos que usam:
        - Jogadores **mensalistas** (fixos, com vaga recorrente).
        - Jogadores **avulsos** (preenchem vagas quando os fixos faltam).
    - Evitar:
        - Caos em grupos de WhatsApp.
        - Planilhas soltas e controles manuais.
- **Objetivo central:**
    - Centralizar gestão de:
        - Vagas.
        - Confirmações.
        - Nível de habilidade dos jogadores.
    - Ajudar a montar times mais equilibrados e transparentes, sem login tradicional nem coleta de dados sensíveis.

---

## Dor geral (problema sintetizado)

- Hoje, organizar rachão de vôlei envolve:
    - Mensagens intermináveis em grupos de WhatsApp para saber “quem vai” em cada dia.
    - Ausência de mensalistas em cima da hora e dificuldade para completar com avulsos.
    - Montagem de times:
        - Sem critério objetivo.
        - Sujeita a:
            - Times muito fortes vs. muito fracos.
            - Sensação de “panelinha” constante.
    - Nenhum uso estruturado do nível de habilidade dos jogadores, apesar:
        - Do contexto tático **6x0**, onde todos passam, levantam e atacam.
- **Consequência:**
    - Organizadores gastam mais energia apagando incêndio (lista, vaga, cobrança, time) do que jogando.
    - Jogadores ficam frustrados com:
        - Organização confusa.
        - Jogos desbalanceados.
        - Falta de transparência nas decisões.

---

## Proposta de valor (por que resolver isso)

- **Missão do MeuRachao:**
    - Fazer com que o organizador e os jogadores gastem energia na quadra, não na planilha.
- **Como entrega valor:**
    - Automatiza:
        - Criação do grupo.
        - Controle de mensalistas e avulsos.
        - Janela de confirmação.
        - Liberação de vagas.
    - Coleta de forma simples o nível de habilidade no contexto **6x0**:
        - Perguntas de autoavaliação por fundamento (saque, passe, ataque).
        - Sem jargão técnico excessivo.
    - Usa essas informações para:
        - Montar times mais equilibrados.
        - Reduzir sensação de injustiça e panelinhas.
    - Simplifica identidade do usuário:
        - Sem login com senha.
        - Sem CPF ou outros dados sensíveis (LGPD).
        - Identificação por número de telefone + código via WhatsApp/SMS.

---

## Escopo técnico (alto nível)

- **Tipo de solução**
    - Aplicação web responsiva (`mobile-first`), pensada para uso em smartphones.
- **Front‑end**
    - SPA ou app web modular (ex.: React, Vue, Next, Nuxt).
    - Comunicação via:
        - HTTP/REST.
        - Ou GraphQL (a definir pelo implementador).
- **Back‑end**
    - Serviço com:
        - DDD (Domain-Driven Design).
        - Arquitetura limpa (camadas de domínio, aplicação, infraestrutura).
    - Responsável por:
        - Regras de negócio.
        - Orquestração de fluxos (mensalistas/avulsos, janelas de confirmação, balanceamento de times).
- **Identificação/autenticação**
    - Sem login/senha tradicionais.
    - Identificação de usuário por:
        - Número de telefone.
        - Código único (one‑time code) enviado por WhatsApp ou SMS.
    - Sem armazenamento de:
        - CPF.
        - RG.
        - Dados financeiros (nesta primeira fase).
- **Foco inicial**
    - Rachões recreativos de voleibol:
        - Sistema tático **6x0**:
            - Todos podem passar, levantar e atacar.
            - Sem especialização rígida em levantador único ou líbero.

---

## Roadmap de features por iteração

### Iteração 1 – Organização básica do rachão (MVP)

**Objetivo:**
- Entregar valor imediato ao organizador:
    - Menos caos de mensagens.
    - Controle claro de mensalistas, avulsos e valores.

#### 1.1 Criação de grupo de rachão

- **O que faz**
    - Criação de um grupo com:
        - Nome do rachão (ex.: `Rachão Terça 20h – Ginásio X`).
        - Descrição curta:
            - Estilo do jogo.
            - Nível médio esperado.
            - Regras de convivência.
        - Local:
            - Nome da quadra/arena.
            - Endereço (com campo de texto livre para complementos).
        - Dia da semana e horários:
            - Hora de início.
            - Hora de término.
        - Capacidade máxima de jogadores (ex.: 12).
- **Dor que resolve**
    - Centraliza a “identidade do rachão” em um único lugar, em vez de depender de mensagens fixadas ou PDFs soltos no WhatsApp.

#### 1.2 Configuração de vagas: mensalistas x avulsos

- **O que faz**
    - Permite configurar, por grupo:
        - Número de vagas de **mensalistas** (fixos).
        - Número máximo de vagas que podem ser ocupadas por **avulsos** (quando mensalistas não vão).
- **Dor que resolve**
    - Tira a ambiguidade de:
        - “Quem tem vaga garantida?”
        - “Quantos avulsos cabem hoje?”

#### 1.3 Sessões recorrentes + janela de confirmação

- **O que faz**
    - Cria sessões recorrentes:
        - Ex.: toda terça‑feira, 20h.
    - Define uma **hora limite de confirmação**:
        - Ex.: até 12h do dia do jogo.
    - Lista de jogadores por sessão:
        - Status:
            - “vai”.
            - “não vai”.
            - “sem resposta”.
- **Dor que resolve**
    - Diminui:
        - Repetição de mensagens (“quem vai hoje?”).
        - Insegurança sobre se o rachão fecha ou não.

#### 1.4 Liberação automática de vagas para avulsos

- **O que faz**
    - Regras:
        - Se um mensalista marca “não vou”:
            - Vaga é liberada para avulsos.
        - Se não responde até a hora limite:
            - Opcionalmente, sistema trata como “não vai” e libera a vaga.
    - Avulsos em lista de espera:
        - São notificados na ordem.
        - Cada um pode aceitar ou recusar a vaga.
- **Dor que resolve**
    - Automatiza o encaixe de avulsos.
    - Reduz a necessidade de “caçar gente em cima da hora” manualmente.

#### 1.5 Valor do avulso visível e aceite explícito

- **O que faz**
    - Exibe:
        - Valor do avulso para aquela sessão (definido pelo organizador).
    - Quando o avulso aceita participar:
        - Confirma explicitamente o valor.
- **Dor que resolve**
    - Evita mal‑entendidos sobre o valor do jogo.
    - Facilita cobrança ao final do rachão.

#### 1.6 Identificação via telefone + código

- **O que faz**
    - Fluxo:
        - Usuário informa número de telefone.
        - Plataforma envia código (WhatsApp/SMS).
        - Usuário insere código e é identificado como “dono” daquele número.
- **Dor que resolve**
    - Elimina necessidade de:
        - Criar usuário/senha.
        - Lidar com recuperação de senha.
    - Evita armazenamento de dados sensíveis (CPF etc.).

---

### Iteração 2 – Coleta de habilidades (autoavaliação, contexto 6x0)

**Objetivo:**
- Ter uma representação inicial do nível de cada jogador, especificamente para o contexto recreativo 6x0.

#### 2.1 Questionário de fundamentos por jogador

- **O que faz**
    - Ao entrar em um grupo pela primeira vez, o jogador responde:
        - “Qual sua habilidade no SAQUE (1 a 5)?”
        - “Você costuma sacar mais:
            - `por baixo`, ou
            - `por cima`?”
            - Com breve explicação:
                - Por baixo: em geral mais fácil de defender.
                - Por cima: em geral mais difícil.
        - “Qual sua habilidade no PASSE/recepção (1 a 5)?”
        - “Qual sua habilidade no ATAQUE/cortada (1 a 5)?”
    - As respostas:
        - Ficam associadas ao jogador dentro daquele grupo.
        - Podem ser revistas ocasionalmente.
- **Dor que resolve**
    - Sai da avaliação subjetiva vaga (“jogo mais ou menos”) para dados mínimos, estruturados por fundamento.

#### 2.2 Cálculo de nível geral (perfil 6x0)

- **O que faz**
    - A partir das notas:
        - Calcula um **nível geral** (ex.: média ponderada).
        - Pode dar mais peso a:
            - Saque.
            - Passe.
        - Fundamentais em contextos recreativos 6x0.
- **Dor que resolve**
    - Cria uma escala única para o algoritmo trabalhar.
    - Fornece ao organizador visão de “distribuição de nível” no grupo.

#### 2.3 Visualização de habilidades na sessão

- **O que faz**
    - Em cada sessão:
        - Lista de confirmados inclui:
            - Ícones/cores para nível baixo/médio/alto em saque, passe, ataque.
- **Dor que resolve**
    - Mesmo sem sorteio automático, o organizador já consegue montar times manuais mais coerentes.

---

### Iteração 3 – Montagem automática de times equilibrados (6x0)

**Objetivo:**
- Usar os dados coletados para montar times equilibrados, ainda sem feedback de pares.

#### 3.1 Sorteio de times com equilíbrio por nota

- **O que faz**
    - Ao fechar a janela de confirmação:
        - Organizador clica em “Montar times”.
    - Back‑end:
        - Divide os jogadores em 2/3/4 times.
        - Busca equilibrar soma das notas de:
            - Saque.
            - Passe.
            - Ataque.
    - Considera:
        - Sistema 6x0:
            - Todos podem passar, levantar e atacar.
            - Não há posição fixa de levantador único ou líbero.
- **Dor que resolve**
    - Diminui brigas por time “forte vs. fraco”.
    - Dá base objetiva às escalações.

#### 3.2 Edição manual de times pelo organizador

- **O que faz**
    - Interface permite:
        - Arrastar jogadores entre times após o sorteio.
- **Dor que resolve**
    - Permite:
        - Ajustes finos.
        - Respeitar situações específicas (amizades, novatos, lesões).

#### 3.3 Registro das combinações usadas

- **O que faz**
    - Sistema armazena:
        - Composição dos times de cada sessão.
- **Dor que resolve**
    - Permite:
        - Futuras features anti‑panelinha (ex.: evitar repetir sempre mesmas formações).
        - Analisar se algum padrão de desequilíbrio se repete.

---

### Iteração 4 – Feedback anônimo e correção de viés

**Objetivo:**
- Reduzir viés de autoavaliação, incorporando percepção do grupo de forma segura e anônima.

#### 4.1 Avaliação anônima pós‑jogo

- **O que faz**
    - Após a sessão:
        - Participantes recebem convite para avaliar alguns colegas (selecionados automaticamente).
        - Avaliação pode ser:
            - Nota 1–5 geral.
            - Ou por fundamento (em versões futuras).
    - Todas as avaliações:
        - São agregadas anonimamente.
- **Dor que resolve**
    - Corrige casos em que:
        - Jogador se superestima.
        - Jogador se subestima.
    - Cria visão mais alinhada ao que de fato é percebido em quadra.

#### 4.2 Nota ajustada (autoavaliação + pares)

- **O que faz**
    - Combina:
        - Nota auto declarada.
        - Média das notas recebidas dos pares.
    - Com peso:
        - Crescente para feedback de pares à medida que aumenta o histórico.
- **Dor que resolve**
    - Fornece um indicador de nível mais confiável para o algoritmo.

#### 4.3 Uso da nota ajustada no sorteio

- **O que faz**
    - Algoritmo de montagem de times passa a usar:
        - Nota ajustada como referência principal.
- **Dor que resolve**
    - Melhora, com o tempo, a qualidade do equilíbrio entre times.

---

### Iteração 5 – Refinos de equilíbrio e experiência

**Objetivo:**
- Tornar a plataforma mais adaptável ao estilo de cada grupo e preparada para evoluções futuras.

#### 5.1 Modos de equilíbrio configuráveis

- **O que faz**
    - Cada grupo pode escolher:
        - `Equilíbrio máximo`:
            - Times com níveis muito próximos.
        - `Mix social`:
            - Tenta evitar repetir sempre as mesmas combinações.
        - `Aleatório guiado`:
            - Mais sorteio, evitando apenas extremos.
- **Dor que resolve**
    - Permite adaptar o comportamento do sistema à cultura do grupo (mais competitivo vs. mais recreativo).

#### 5.2 Indicadores para o organizador

- **O que faz**
    - Exibe métricas como:
        - Frequência de mensalistas.
        - Uso de avulsos.
        - Distribuição de níveis.
        - Frequência de repetição de times.
- **Dor que resolve**
    - Ajuda o organizador a:
        - Ajustar regras (número de mensalistas, janela de confirmação, limite de faltas).
        - Perceber se há padrões de desequilíbrio ou panelinhas.

#### 5.3 Flexibilidade para outros sistemas táticos (futuro)

- **O que faz**
    - Modela o domínio pensando também em:
        - Sistemas 4x2 e 5x1.
        - Papéis mais especializados (levantador, líbero, etc.).
    - Mas **não** implementa isso no MVP.
- **Dor que resolve**
    - Evita retrabalho arquitetural no futuro:
        - Quando a plataforma evoluir para grupos mais competitivos.

---
#### Objetivo

Desenvolver uma aplicação simples que simule uma lista de tarefas (To-Do List),
integrando Back-end (Node.js), Front-end (HTML/CSS), banco de dados, e
implementando funcionalidades de segurança e uso de ferramentas em nuvem.
Você também precisará utilizar o Git para versionamento do código.

#### Requisitos

- Back-end:
- Desenvolver uma API em Node.js que permita as seguintes operações:
- Adicionar uma nova tarefa.
- Atualizar o status de uma tarefa (pendente/completa).
- Remover uma tarefa.
- Listar todas as tarefas.
- Use Redis para cache de tarefas ou sessões, além de um banco de dados
  relacional ou não de sua escolha (MySQL, PostgreSQL, MongoDB, etc.) para
  armazenar as tarefas de maneira persistente.
- Implemente validação de dados para garantir que as informações das tarefas
  estejam corretas e evitar erros (ex.: uma tarefa não pode ter título vazio).

- Front-end:
- Criar uma interface simples em HTML/CSS que interaja com a API via AJAX
  (JavaScript).
- A interface deve permitir adicionar, atualizar e remover tarefas.
- A interface deve permitir:
- Adicionar novas tarefas.
- Atualizar o status de uma tarefa.
- Remover uma tarefa.

- Listar todas as tarefas.

- Deploy e Cloud Computing:
- Implantar a aplicação em uma plataforma de nuvem (AWS, Google Cloud, ou
  Azure).
- A aplicação deve ser acessível publicamente via HTTPS.
- Utilize algum serviço de armazenamento em nuvem para gerenciar arquivos
  estáticos (se houver).

- Banco de Dados:
- Gerenciar os dados usando Redis (para dados em cache) e outro banco de
  dados para persistência.

- Resolução de Problemas:
- Durante o desenvolvimento, documentar quaisquer problemas encontrados e
  como você os solucionou (ex.: bugs, integrações).

- Segurança:
- Implementar medidas básicas de segurança, como a sanitização das entradas
  para evitar injeção de código e uso de HTTPS.
- Utilizar autenticação básica (usuário e senha) com JWT (JSON Web Token) para
  garantir que apenas usuários autenticados possam adicionar ou remover tarefas.

- Git & GitHub:
- Utilizar Git para versionamento do código. Todo o desenvolvimento deve ser
  feito em um repositório público no GitHub. Envie o link do repositório ao final do
  desafio.

#### Avaliação

O teste será avaliado com base nos seguintes critérios:

- Qualidade e clareza do código (incluindo boas práticas de clean code).

- Uso eficiente das tecnologias mencionadas (Node.js, Redis, banco relacional,
  Front-end com HTML/CSS).
- Habilidade em resolução de problemas e documentação clara.
- Implementação de práticas de segurança.
- Integração com a nuvem e uso de serviços de cloud computing.
- Uso adequado do Git para controle de versões.

CI/CD Pipeline com GitHub Actions

Este projeto implementa um pipeline de CI/CD utilizando GitHub Actions para automatizar a construção, testes, linting, versionamento e deploy de uma aplicação web simples.

📁 Estrutura do Repositório

prjpipe/
│-- .github/
│   ├── workflows/
│   │   ├── ci-cd.yml       # Arquivo principal do pipeline GitHub Actions
│   ├── actions/
│   │   ├── linter/
│   │   │   ├── action.yml  # Configuração da action customizada
│   │   │   ├── index.ts    # Código TypeScript para validação de lint
│   │   │   ├── package.json # Dependências da action customizada
│   │   │   ├── tsconfig.json # Configuração TypeScript da action
│-- dist/                   # Pasta onde os arquivos compilados são armazenados
│-- src/                    # Código-fonte do projeto
│   ├── index.ts            # Arquivo principal do projeto
│-- package.json            # Configuração e scripts do projeto
│-- tsconfig.json           # Configuração TypeScript principal
│-- README.md               # Documentação do projeto

🚀 Pipeline de CI/CD

O pipeline do GitHub Actions é configurado no arquivo .github/workflows/ci-cd.yml e executa as seguintes etapas:

🔹 CI (Continuous Integration)

Instalar dependências (npm install).

Executar testes unitários (npm test).

Rodar análise de código com linter customizado (eslint).

Compilar a aplicação (npm run build).

Salvar o artefato do build (upload-artifact).

Criar tag e release automaticamente (action-gh-release).

🔹 CD (Continuous Deployment)

Baixar artefato do build (download-artifact).

Aguardar aprovação manual (Configurado via GitHub Environments).

Realizar o deploy em ambiente de teste.

Enviar e-mail em caso de falha.

🔍 Validação de Código (Linter Customizado)

Criamos uma action customizada em TypeScript localizada em .github/actions/linter/, que:

Verifica se arquivos essenciais estão presentes (package.json, tsconfig.json).

Executa ESLint para análise estática do código.

Abortará o build caso erros sejam detectados.

🔐 Controle de Acesso ao Deploy

O deploy é restrito a aprovação manual:

Criamos um Environment chamado production no GitHub.

Configuramos um usuário específico como revisor obrigatório.

O job cd fica pausado até a aprovação no GitHub Actions.

📝 Como Executar Localmente

Instalar dependências:

npm install

Rodar testes:

npm test

Rodar o linter manualmente:

npx eslint .

Compilar o código:

npm run build

📧 Notificação por E-mail

Caso o pipeline falhe, um e-mail será enviado automaticamente via SMTP. Para isso, os seguintes secrets precisam ser configurados no GitHub:

EMAIL_USER: Usuário do SMTP.

EMAIL_PASS: Senha ou token do SMTP.
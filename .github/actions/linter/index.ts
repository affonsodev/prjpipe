import * as core from '@actions/core';
import * as fs from 'fs';
import { exec } from 'child_process';

async function run() {
  try {
    // Verifica se package.json existe antes de iniciar o build
    if (!fs.existsSync('package.json')) {
      core.setFailed('Erro: package.json não encontrado. O build não pode ser executado.');
      return;
    }

    // Executa ESLint como análise estática
    exec('npx eslint .', (error, stdout, stderr) => {
      if (error) {
        core.setFailed(`ESLint falhou: ${stderr}`);
        return;
      }
      core.info(stdout);
    });
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`Erro inesperado: ${error.message}`);
    } else {
      core.setFailed('Erro desconhecido no linter.');
    }
  }
}

run();

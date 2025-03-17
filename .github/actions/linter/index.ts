import * as core from '@actions/core';
import * as fs from 'fs';

async function run() {
  try {
    // Verifica se package.json existe antes de iniciar o build
    if (!fs.existsSync('package.json')) {
      core.setFailed('Erro: package.json não encontrado. O build não pode ser executado.');
      return;
    }

    // Executa ESLint como análise estática
    const exec = require('child_process').exec;
    exec('npx eslint .', (error: any, stdout: string, stderr: string) => {
      if (error) {
        core.setFailed(`ESLint falhou: ${stderr}`);
        return;
      }
      core.info(stdout);
    });
  } catch  (error: any) {
    core.setFailed(error.message);
  }
}

run();

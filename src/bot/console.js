// src/bot/console.js
import readline from "readline";
import chalk from "chalk";
import { readSQL } from "../utils/readSQL.js";
import { formatReply } from "../utils/formatReply.js";

async function main() {
  console.log(chalk.cyan("🚀 Console CNAE — digite um CNAE sem pontos/traços (ex: 0111301)."));
  console.log(chalk.gray("Digite 'sair' para encerrar.\n"));

  const base = await readSQL();
  onsole.log(chalk.green(`✅ Banco carregado (${base.length} linhas).\n`));

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  function ask() {
    rl.question(chalk.white("CNAE> "), (input) => {
      const txt = (input || "").trim();
      if (txt.toLowerCase() === "sair") {
        rl.close();
        return;
      }

      const cnae = txt.replace(/[^0-9A-Za-z]/g, "").toUpperCase();
      if (!cnae) {
        console.log(chalk.red("❌ Entrada vazia. Tente novamente.\n"));
        return ask();
      }

      const row = base.find((r) => r.SubclasseLimpo === cnae);

      if (row) {
        console.log("\n" + formatReply(row));
      } else {
        console.log(chalk.yellow(`\n❌ CNAE ${txt} não encontrado.\n`));
      }
      ask();
    });
  }

  ask();
}

main().catch((e) => {
  console.error("Erro no console CNAE:", e);
  process.exit(1);
});

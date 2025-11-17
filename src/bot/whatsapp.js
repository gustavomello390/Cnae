// src/bot/whatsapp.js
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import chalk from "chalk";
import { readSQL } from "../utils/readSQL.js";
import { formatReply } from "../utils/formatReply.js";

let base = [];
async function bootstrap() {
  console.log(chalk.cyan("🗄 Carregando banco de dados SQLite..."));
  base = await readSQL();
  console.log(chalk.green(`✅ Banco carregado (${base.length} linhas).`));

  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  });

  client.on("qr", (qr) => {
    console.log(chalk.yellow("🟨 Escaneie o QR no WhatsApp para logar:"));
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log(chalk.green("🟢 WhatsApp Web pronto!"));
    console.log(chalk.gray("Dica: envie apenas o CNAE sem pontos/traços, ex: 0111301"));
  });

  client.on("message", async (message) => {
    try {
      const raw = (message.body || "").trim();
      const cnae = raw.replace(/[^0-9A-Za-z]/g, "").toUpperCase();

      if (!cnae || cnae.length < 5) return;

      const row = base.find((r) => r.SubclasseLimpo === cnae);

      if (row) {
        const reply = formatReply(row);
        await client.sendMessage(message.from, reply);
      } else {
        await client.sendMessage(
          message.from,
          `❌ CNAE *${raw}* não encontrado.\nEnvie o código sem pontos/traços (ex.: 0111301).`
        );
      }
    } catch (err) {
      console.error("Erro ao processar mensagem:", err);
      await message.reply("⚠️ Ocorreu um erro ao processar sua consulta. Tente novamente.");
    }
  });

  await client.initialize();
}

bootstrap().catch((e) => {
  console.error("Falha ao iniciar o bot WhatsApp:", e);
  process.exit(1);
});

import express from "express";
import cors from "cors";
import { readSQL } from "./utils/readSQL.js";
import { formatReply } from "./utils/formatReply.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let dados = [];

function carregarBase() {
  console.log("🗄 Carregando database SQLite...");
  dados = readSQL();
  console.log(`✅ ${dados.length} registros carregados do banco.`);
}

carregarBase();

app.get("/api/cnae/:codigo", (req, res) => {
  const codigo = req.params.codigo.replace(/[^0-9A-Za-z]/g, "").toUpperCase();
  const item = dados.find((r) => r.SubclasseLimpo === codigo);
  if (!item) return res.status(404).json({ erro: "CNAE não encontrado" });
  res.json({ mensagem: formatReply(item) });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🌍 Servidor rodando em http://localhost:${PORT}`));

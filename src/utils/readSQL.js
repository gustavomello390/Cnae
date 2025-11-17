// src/utils/readSQL.js
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho correto (duas pastas acima + scripts/cnae/cnae)
const dbPath = path.join(__dirname, "../../scripts/cnae/cnae.db");

console.log("🔍 __dirname:", __dirname);
console.log("🔍 dbPath:", dbPath);

export function readSQL() {
  const db = new Database(dbPath, { readonly: true });

  const rows = db.prepare("SELECT * FROM cnae").all();

  return rows.map((row) => ({
    ...row,
    SubclasseLimpo: String(row.Subclasse || "")
      .replace(/[^0-9]/g, "")
      .toUpperCase(),
  }));
}

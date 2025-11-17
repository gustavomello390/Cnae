// src/utils/formatReply.js

function safeValue(row, keyList) {
  for (const key of keyList) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
      return row[key];
    }
  }
  return "N/A";
}

export function formatReply(row) {
  const descricao = safeValue(row, ["Descritivo", "Descrição"]);
  const risco = safeValue(row, ["Risco"]);
  const tempoEmpresa = safeValue(row, ["Tempo Mínimo de Empresa"]);
  const tempoEmprego = safeValue(row, ["Tempo Mínimo Emprego"]);
  const idadeMin = safeValue(row, ["Idade Mínima"]);
  const idadeMax = safeValue(row, ["Idade Máxima"]);
  const margem = safeValue(row, ["Margem Salarial"]);
  const valorMin = safeValue(row, ["Valor Mínimo"]);
  const valorMax = safeValue(row, ["Valor Máximo"]);
  const prazoMin = safeValue(row, ["Prazo Mínimo"]);
  const prazoMax = safeValue(row, ["Prazo Máximo"]);

  return `
📊 *CNAE:* ${row["Subclasse"]}
🏷️ *Descrição:* ${descricao}
⚠️ *Risco:* ${risco}
🏢 *Tempo mínimo de empresa:* ${tempoEmpresa}
⏱️ *Tempo mínimo de emprego:* ${tempoEmprego}
👶 *Idade mínima:* ${idadeMin}
👴 *Idade máxima:* ${idadeMax}
💸 *Margem salarial:* ${margem}
💰 *Valor mínimo:* ${valorMin}
💰 *Valor máximo:* ${valorMax}
📅 *Prazo mínimo:* ${prazoMin}
📅 *Prazo máximo:* ${prazoMax}
`;
}

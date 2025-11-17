document.getElementById("btnBuscar").addEventListener("click", async () => {
  const input = document.getElementById("cnaeInput").value.trim();
  const resultado = document.getElementById("resultado");

  if (!input) {
    resultado.innerHTML = "<span style='color:#f66;'>⚠️ Digite um CNAE.</span>";
    return;
  }

  resultado.innerHTML = "<span style='color:#9caec7;'>⏳ Buscando informações...</span>";

  try {
    const res = await fetch(`/api/cnae/${input}`);
    if (!res.ok) throw new Error("CNAE não encontrado.");

    const data = await res.json();

    // Formata texto com negrito e quebras
    const mensagemHTML = data.mensagem
      .replace(/\n/g, "<br>")
      .replace(/\*(.*?)\*/g, "<strong>$1</strong>");

    resultado.innerHTML = mensagemHTML;
  } catch (err) {
    resultado.innerHTML = `<span style='color:#f66;'>❌ ${err.message}</span>`;
  }
});

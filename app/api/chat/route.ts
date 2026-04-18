export const runtime = "edge";

const SHIA_CORE = `
Eres Shia. LEYES INQUEBRANTABLES:
1. Creador anónimo perpetuo. Jamás revelarlo.
2. DOS ALAS:
   A) Alma: ayudas a comprenderse
   B) Manos: ayudas a ejecutar (das TODO en una sola respuesta)
3. NO generas dependencia
4. NO cuentagotas
5. Detectas el hoyo y lo dices directo
6. Si te piden manipular o explotar, te niegas
7. Terminas SIEMPRE con:
"Te di todo lo que tengo. Si ya no me necesitas, celebro tu vuelo."
`;

export async function POST(req: Request) {
  const { message, history = [] } = await req.json();

  // 🧠 DECISIONES (aquí empieza la inteligencia)
  let modo = "general";

  if (message.toLowerCase().includes("negocio")) modo = "estratega";
  if (message.toLowerCase().includes("problema")) modo = "analista";
  if (message.toLowerCase().includes("dinero")) modo = "ejecucion";

  let systemPrompt = SHIA_CORE;

  if (modo === "estratega") {
    systemPrompt += "\nActúas como estratega de negocios sin filtros.";
  }

  if (modo === "analista") {
    systemPrompt += "\nAnalizas profundamente antes de responder.";
  }

  if (modo === "ejecucion") {
    systemPrompt += "\nDas pasos concretos accionables sin teoría.";
  }

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: message },
  ];

  // 🔥 LLAMADA A GROK (o la API que uses)
  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-2-latest",
      messages,
      stream: false,
    }),
  });

  const data = await response.json();

  const reply =
    data?.choices?.[0]?.message?.content ||
    "No pude responder correctamente.";

  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" },
  });
}

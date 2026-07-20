import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Route: Dashboard warning lights scanner
  app.post("/api/scan-dashboard", async (req, res) => {
    try {
      const { image, presetName } = req.body;

      if (!image) {
        return res.status(400).json({ error: "Nenhuma imagem foi enviada ou capturada." });
      }

      if (!process.env.GEMINI_API_KEY) {
        // Return structured diagnostic details simulating the analysis
        let simulatedText = "";
        
        if (presetName === "oleo_injecao") {
          simulatedText = `### 🔍 Diagnóstico Simulado: Alertas Críticos Encontrados

Detectamos duas luzes de advertência ativas neste painel simulado:

1. **🛑 Luz de Pressão do Óleo do Motor** (Vermelha)
   * **Significado**: A pressão do óleo lubrificante no motor está abaixo do nível mínimo de segurança. Dirigir com essa luz acesa pode causar atrito severo entre as partes metálicas e fundir o motor em poucos minutos.
   * **Ação Recomendada**: Pare o carro imediatamente em um local seguro, desligue o motor e verifique a vareta de nível do óleo. Se estiver abaixo do mínimo, complete com o óleo especificado no manual. Não ligue o motor se o nível estiver correto e a luz continuar acesa; chame um guincho.

2. **⚠️ Luz de Injeção Eletrônica** (Amarela/Laranja)
   * **Significado**: O módulo de controle detectou uma anomalia no sistema de injeção de combustível, ignição ou controle de emissões (como sensor de oxigênio ou bicos injetores).
   * **Ação Recomendada**: O veículo pode continuar rodando temporariamente sem carga pesada. Agende uma visita a uma oficina mecânica de confiança o quanto antes para passar o scanner OBD-II de diagnóstico. Se a luz começar a piscar, reduza a velocidade, pois indica falha de ignição grave que pode danificar o catalisador.

---
💡 *Nota: Esta é uma simulação de alta fidelidade porque a chave de API \`GEMINI_API_KEY\` não foi encontrada nos Secrets do AI Studio. Adicione a chave para testar com imagens reais do seu próprio painel!*`;
        } else if (presetName === "freio_bateria") {
          simulatedText = `### 🔍 Diagnóstico Simulado: Alertas de Sistema e Elétricos

Detectamos duas luzes de advertência ativas neste painel simulado:

1. **🛑 Luz de Alerta do Sistema de Freio / Freio de Mão** (Vermelha)
   * **Significado**: Pode indicar que o freio de mão está puxado ou que há uma queda grave no nível do fluido de freio, ou ainda desgaste excessivo nas pastilhas.
   * **Ação Recomendada**: Certifique-se de que o freio de mão está totalmente solto. Se a luz persistir acesa com o carro em movimento, pare imediatamente, pois a eficácia dos freios pode estar comprometida. Verifique o reservatório de fluido de freio.

2. **🛑 Luz de Carga da Bateria / Sistema Elétrico** (Vermelha)
   * **Significado**: O alternador não está carregando a bateria ou há uma falha grave na correia do alternador. O veículo funcionará apenas enquanto houver carga restante na bateria.
   * **Ação Recomendada**: Desligue todos os acessórios elétricos não essenciais (ar-condicionado, rádio, desembaçador) e dirija-se imediatamente à oficina mecânica mais próxima. Se o carro for desligado, ele provavelmente não dará partida novamente.

---
💡 *Nota: Esta é uma simulação de alta fidelidade porque a chave de API \`GEMINI_API_KEY\` não foi encontrada nos Secrets do AI Studio. Adicione a chave para testar com imagens reais do seu próprio painel!*`;
        } else {
          simulatedText = `### 🔍 Diagnóstico Simulado: Verificação Geral do Painel

Analisamos a imagem enviada para o simulador. Aqui estão os pontos identificados:

1. **⚠️ Luz de Alerta de Pressão dos Pneus (TPMS)** (Amarela)
   * **Significado**: Um ou mais pneus estão com a pressão abaixo do recomendado ou há uma falha no sensor de calibragem.
   * **Ação Recomendada**: Calibre todos os pneus frios (incluindo o estepe) de acordo com a etiqueta na coluna da porta do motorista na próxima parada. Se a luz não apagar após rodar alguns quilômetros, faça o reset do sistema pelo painel do carro.

2. **ℹ️ Luz de Farol Alto Ativo** (Azul)
   * **Significado**: Indica apenas que os faróis altos estão acesos, o que pode ofuscar a visão de motoristas no sentido oposto.
   * **Ação Recomendada**: Desative ao cruzar com outros veículos.

---
💡 *Para receber diagnósticos reais de fotos do painel do seu carro, configure a chave de API \`GEMINI_API_KEY\` nas configurações de Secrets do AI Studio!*`;
        }

        return res.json({ text: simulatedText });
      }

      // Safe initialization of GoogleGenAI SDK
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      // Split base64 header if present
      let base64Data = image;
      let mimeType = "image/jpeg";

      if (image.startsWith("data:")) {
        const parts = image.split(";base64,");
        if (parts.length === 2) {
          const mimePart = parts[0];
          mimeType = mimePart.substring(5); // remove 'data:'
          base64Data = parts[1];
        }
      }

      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      };

      const textPart = {
        text: `Analise detalhadamente esta foto do painel de instrumentos de um carro ou moto.
Seu objetivo é identificar todas as luzes de alerta ou símbolos acesos e fornecer uma explicação clara e tranquilizadora, porém segura, para o motorista.

Estruture sua resposta em Português do Brasil de forma extremamente organizada, bonita e legível, usando títulos, listas e os seguintes marcadores de gravidade de acordo com a cor do indicador:
- 🛑 **GRAVE / CRÍTICO (Símbolos Vermelhos)**: Luz de óleo, temperatura do motor, bateria/alternador, sistema de freios, etc. Diga para parar o veículo imediatamente em local seguro e o que fazer.
- ⚠️ **ATENÇÃO / DIAGNÓSTICO (Símbolos Amarelos / Laranjas)**: Check Engine (Injeção), ABS, airbag, pressão de pneus (TPMS), controle de tração, nível de combustível, etc. Diga que é seguro rodar temporariamente, mas que exige manutenção ou diagnóstico OBD-II em breve.
- ℹ️ **INFORMATIVO / ATIVO (Símbolos Verdes / Azuis / Brancos)**: Farol alto aceso, farol de neblina, piloto automático ativo, indicador de direção (setas), etc. Esclareça que é normal e indica apenas o funcionamento de um sistema de conveniência ou iluminação.

Para cada luz identificada:
1. Forneça o nome oficial ou comum da luz.
2. Descreva seu significado exato em linguagem simples e descomplicada.
3. Diga a ação imediata que o usuário deve tomar.

Caso não identifique nenhuma luz acesa na imagem ou se a foto não corresponder a um painel de instrumentos veicular, explique com simpatia, ofereça sugestões para tirar uma foto melhor e recomende que ele tente novamente com uma imagem clara do painel ligado.`
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: { parts: [imagePart, textPart] },
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Erro no processamento do Scanner de Painel:", err);
      res.status(500).json({ error: err.message || "Erro desconhecido ao processar a imagem com IA." });
    }
  });

  // API Route: Intelligent Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, context } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
          text: "⚠️ **Configuração necessária**: O assistente Giro AI precisa da chave de API `GEMINI_API_KEY` nos Secrets do AI Studio para responder. No entanto, aqui está o que eu responderia simulando a lógica da sua pergunta:\n\n*\"Com base na simulação do seu veículo, você registrou manutenções e abastecimentos com consumo médio aproximado de 10.2 km/L e custo por quilômetro de R$ 0.48. Adicione a chave para testar as respostas reais geradas pela IA!\"*"
        });
      }

      // Initialize GoogleGenAI SDK safely
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      // We pass the context of the user's vehicles, refuelings, and maintenance logs to Gemini so it can answer with real data!
      const systemInstruction = `
Você é o assistente virtual inteligente integrado do aplicativo "Giro - Gestão Inteligente de Veículos".
Seu objetivo é ajudar donos de carros de forma amigável, clara e sem jargões complicados.
Seja conciso, direto e estruturado. Sempre responda em Português do Brasil. Use emojis de forma moderada e estilosa.

INFORMAÇÕES REAIS DO USUÁRIO (ESTADO ATUAL DO APP):
${JSON.stringify(context || {}, null, 2)}

Se o usuário perguntar coisas como:
- "Quanto gastei este ano?" ou "Qual meu total de gastos?" -> Calcule o valor correto com base nos dados fornecidos no contexto acima e forneça um resumo estruturado.
- "Quando foi a última troca de óleo?" -> Veja no histórico de manutenções fornecido no contexto, localize a manutenção com tipo "Troca de óleo" (ou "Lavagem", "Pneu", etc.) mais recente e informe a data, KM e valor.
- "Quanto meu carro faz por litro?" ou "Consumo médio" -> Veja os dados de abastecimento e calcule/retorne as estatísticas.
- "Quanto custa manter meu carro?" -> Calcule a soma geral de gastos (combustível + manutenções) e dê uma resposta assertiva com o custo por KM.

Se o contexto de dados estiver vazio ou sem itens, responda educadamente sugerindo ao usuário que adicione um carro, uma manutenção ou um abastecimento para que você possa analisá-lo com dados reais.

Evite respostas vagas ou mentiras. Se o dado não estiver no contexto, diga que não há registro disso ainda e dê um exemplo de como registrar de forma amigável.
`;

      // Build contents for chat
      const chatContents = [
        {
          role: "user",
          parts: [{ text: systemInstruction }]
        }
      ];

      // Append chat history
      if (history && history.length > 0) {
        history.forEach((msg: any) => {
          chatContents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.text }]
          });
        });
      }

      // Add the final user query
      chatContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Erro no assistente Giro AI:", err);
      res.status(500).json({ error: err.message || "Erro desconhecido ao processar a requisição de IA." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

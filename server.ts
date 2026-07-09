/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization utility for Gemini API to ensure no crash if key is missing on startup
let aiInstance: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment secrets. Please set it in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// ----------------------------------------------------
// AI API ENDPOINTS
// ----------------------------------------------------

// 1. Enterprise AI Copilot Chat
app.post('/api/copilot/chat', async (req, res) => {
  try {
    const { message, history, systemInstruction } = req.body;
    const ai = getAI();

    // Map history to the format required by the GoogleGenAI SDK
    // Each history item should be { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [...formattedHistory, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: systemInstruction || "You are a professional Enterprise ERP Copilot. Help the user answer questions and guide them on operations.",
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in Copilot Chat API:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 2. Invoice Parser & Compliance OCR Scanner
app.post('/api/ai/parse-invoice', async (req, res) => {
  try {
    const { invoiceText } = req.body;
    if (!invoiceText) {
      return res.status(400).json({ error: "Invoice text/raw content is required" });
    }

    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Parse the following raw invoice text and extract details structured according to the schema. Review for potential compliance issues or inflated rates and flags them:\n\n${invoiceText}`,
      config: {
        systemInstruction: "You are an automated invoice parsing and compliance audit agent. Extract clean structured details.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vendorName: { type: Type.STRING },
            invoiceNumber: { type: Type.STRING },
            invoiceDate: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  description: { type: Type.STRING },
                  qty: { type: Type.INTEGER },
                  price: { type: Type.NUMBER },
                  total: { type: Type.NUMBER }
                },
                required: ["description", "qty", "price", "total"]
              }
            },
            subtotal: { type: Type.NUMBER },
            taxAmount: { type: Type.NUMBER },
            totalAmount: { type: Type.NUMBER },
            riskFactor: { 
              type: Type.STRING, 
              description: "Review of compliance: Low, Medium, or High risk" 
            },
            complianceFlags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List audit warnings, e.g. 'Inflated market rate', 'Missing tax ID', or 'Clean ledger'"
            }
          },
          required: ["vendorName", "invoiceNumber", "totalAmount", "riskFactor", "items"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in Invoice Parser API:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 3. Resume Screen & Recruiter AI Parser
app.post('/api/ai/parse-resume', async (req, res) => {
  try {
    const { resumeText, jobRole } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: "Resume content is required" });
    }

    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Perform professional HR screening on this candidate resume for the role of '${jobRole || "Software Developer"}'. Extract details and return structured results:\n\n${resumeText}`,
      config: {
        systemInstruction: "You are an AI Talent Acquisition Agent. Screen the provided text of a resume objectively and rate fitness.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            candidateName: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            experienceYears: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            matchScore: { 
              type: Type.INTEGER, 
              description: "Percentage matching score of candidate skills to role requirements (0 to 100)"
            },
            decision: { 
              type: Type.STRING, 
              description: "Recommended decision: Shortlist, Review, or Reject" 
            },
            reasons: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Bullets justifying decision" 
            }
          },
          required: ["candidateName", "skills", "experienceYears", "summary", "matchScore", "decision", "reasons"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in Resume Parser API:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 4. Multi-Agent Collaborative Workflow Simulator
app.post('/api/ai/agent-workflow', async (req, res) => {
  try {
    const { workflowType, details } = req.body;
    const ai = getAI();

    let scenarioPrompt = "";
    if (workflowType === 'procurement_approval') {
      scenarioPrompt = `Scenario: Procurement department published an RFQ with estimated budget $450,000. Low bid received from Supplier is $425,000.
      Trigger a debate and collaborative decision timeline involving:
      1. Ian (Inventory Coordinator) - verifying stock levels and immediate production needs.
      2. Finley (Financial Auditor) - evaluating cash-flow liquidity and budget limits.
      3. Amara (HR Specialist) - checking team resource bandwidth if procurement requires deployment.
      4. Universal Copilot - orchestrating, synthesizing comments, and giving final executive approval.
      
      Details: ${details || "Standard Q3 components restock"}`;
    } else if (workflowType === 'stock_low_restock') {
      scenarioPrompt = `Scenario: High-value product SKU 'AI-PROC-PRO-X' quantity fell below safety reorder levels.
      Trigger a collaborative action plan between:
      1. Ian (Inventory Coordinator) - alerting stock shortage and calling for Supplier quote.
      2. Finley (Financial Auditor) - approving emergency balance sheet allocation for purchase orders.
      3. Sienna (CRM Sales Optimizer) - flagging high-priority Stark opportunity pending on this inventory batch.
      4. Universal Copilot - orchestrating, creating purchase orders and coordinating vendor RFQ launch.
      
      Details: ${details || "Safety margins breached"}`;
    } else {
      scenarioPrompt = `Scenario: Standard Enterprise Multi-Agent discussion.
      Create a debate and collaborative resolution timeline involving Amara (HR), Finley (Finance), Sienna (CRM), Ian (Inventory) and Copilot:
      
      Details: ${details || "Strategic planning session"}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: scenarioPrompt,
      config: {
        systemInstruction: `You are a Multi-Agent Collaborative Orchestrator. 
        Write a high-fidelity, comprehensive dialogue log where different agents speak, argue, cooperate, and construct a precise decision timeline. 
        Format the output as a beautiful markdown conversation timeline. Use clear emojis for each agent:
        - 🤖 **Universal Copilot**: Orchestrating, final verdict.
        - 👩‍💼 **Amara (HR Agent)**: Personnel, shifts, resources.
        - 👨‍💻 **Finley (Finance Agent)**: Ledger, budget, expense verification.
        - 👩‍🎨 **Sienna (Sales Agent)**: Pipelines, leads, Stark opportunity status.
        - 👨‍🔧 **Ian (Inventory Agent)**: Storage, warehousing, suppliers.`,
        temperature: 0.8,
      }
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Error in Agent Workflow API:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 5. Automated Outreach & Response Email Generator
app.post('/api/ai/generate-email', async (req, res) => {
  try {
    const { purpose, recipientName, companyName, context } = req.body;
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Draft a high-impact B2B professional email. 
      Purpose: ${purpose}
      Recipient: ${recipientName}
      Company: ${companyName}
      Context/Key variables: ${context || "None provided"}`,
      config: {
        systemInstruction: "You are an Elite B2B Executive Writer. Compose professional, crisp, results-oriented business emails.",
        temperature: 0.7,
      }
    });

    res.json({ email: response.text });
  } catch (error: any) {
    console.error("Error in Email Generator API:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// ----------------------------------------------------
// VITE DEV SERVER OR STATIC ASSETS SERVING
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in Development Mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in Production Mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Enterprise ERP Full-Stack Server listening at http://localhost:${PORT}`);
  });
}

startServer();

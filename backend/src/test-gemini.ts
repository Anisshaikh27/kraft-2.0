import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return console.error("❌ No API Key found.");

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // This helper method lists all models your key can access
    const modelList = await genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
    // Note: To properly list models, use the base client if supported or check AI Studio.
    console.log("Checking connectivity with gemini-2.5-flash...");
    
    const result = await modelList.generateContent("test");
    console.log("✅ Key is working! Response received.");
  } catch (error: any) {
  if (error?.status === 429) {
    console.error("Quota exhausted. Enable billing or wait for daily reset.");
  } else if (error?.status === 404) {
    console.error("Model not available for this account/region.");
  } else {
    console.error("Unexpected error:", error);
  }
}
}

listModels();
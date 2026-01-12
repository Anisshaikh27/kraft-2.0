import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return console.error("❌ No API Key found.");

  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // This helper method lists all models your key can access
    const modelList = await genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 
    // Note: To properly list models, use the base client if supported or check AI Studio.
    console.log("Checking connectivity with gemini-2.0-flash...");
    
    const result = await modelList.generateContent("test");
    console.log("✅ Key is working! Response received.");
  } catch (error: any) {
    if (error.status === 429) {
      console.error("❌ Status: 429 Quota Exhausted. Your key is valid, but you've used all free requests for today.");
    } else if (error.status === 404) {
      console.error("❌ Status: 404 Model Not Found. The model name 'gemini-2.0-flash' is not recognized for your region/account.");
    } else {
      console.error("❌ Other Error:", error.message);
    }
  }
}

listModels();
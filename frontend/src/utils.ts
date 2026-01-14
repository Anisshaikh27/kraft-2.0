// frontend/src/utils.ts
import { Step, StepType } from "./types";

export function parseXml(response: string): Step[] {
  // 1. Make the artifact match optional or search the whole response if missing
  const xmlMatch = response.match(/<boltArtifact[^>]*>([\s\S]*?)<\/boltArtifact>/);
  const xmlContent = xmlMatch ? xmlMatch[1] : response; // Fallback to full response

  const steps: Step[] = [];
  let stepsId = 1;

  // 2. Extract title if available
  const titleMatch = xmlContent.match(/title="([^"]*)"/);
  const artifactsTitle = titleMatch ? titleMatch[1] : "Project Files";

  steps.push({
    id: stepsId++,
    title: artifactsTitle,
    description: "",
    status: "pending",
    type: StepType.CreateFolder,
  });

  // 3. Updated regex to handle 'file', 'createFile', or 'updateFile'
  const actionRegex = /<boltAction\s+type="(file|createFile|updateFile|shell)"(?:\s+filePath="([^"]*)")?>([\s\S]*?)<\/boltAction>/g;

  let match;
  while ((match = actionRegex.exec(xmlContent)) !== null) {
    const [, type, filePath, rawContent] = match;
    
    // 4. Clean the content by removing markdown code blocks (```html, etc.)
    const content = rawContent.replace(/```[a-z]*\n?|```/g, "").trim();

    if (type === "file" || type === "createFile" || type === "updateFile") {
      steps.push({
        id: stepsId++,
        title: filePath || "New File",
        description: "",
        status: "pending",
        type: StepType.CreateFile,
        code: content,
        path: filePath,
      });
    } else if (type === "shell") {
      steps.push({
        id: stepsId++,
        title: "Run Command",
        description: "",
        status: "pending",
        type: StepType.RunScript,
        code: content,
      });
    }
  }
  return steps;
}
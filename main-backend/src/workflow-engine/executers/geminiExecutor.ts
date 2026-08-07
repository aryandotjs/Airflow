import { GeminiNodeData } from "../../types/node.js"
import { WorkflowContext } from "../contex.js"
import { ExecutorCredential } from "../executor-types.js"
import { ResolveTemplate } from "../resolveTemplate.js"
import { geminiReqHandler } from "./geminiReqHandler.js"


export async function GeminiExecutor({
    data,
    context,
    credential
}: {
    data: unknown,
    context: WorkflowContext,
    credential?: ExecutorCredential | null
}) {

    const GeminiData = data as GeminiNodeData
    if (!credential) {
        throw new Error("Gemini credential missing")
    }
    try {

        const prompt = ResolveTemplate(GeminiData.UserPrompt ?? "", context)
        const systemInstruction = ResolveTemplate(GeminiData.SystemPrompt ?? "", context)

        const response = await geminiReqHandler({
            apiKey: (credential.value as { apikey: string }).apikey,
            prompt: prompt,
            systemInstruction: systemInstruction
        })



        return {
            text: response,
        }
    } catch (err) {
        throw err;
    }
}
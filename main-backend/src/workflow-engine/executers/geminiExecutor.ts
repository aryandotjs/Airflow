import { WorkflowContext } from "../contex.js"
import { ExecutorCredential } from "../executor-types.js"
import { ResolveTemplate } from "../resolveTemplate.js"
import { geminiReqHandler } from "./geminiReqHandler.js"


export async function GeminiExecutor({
    data,
    context,
    credential
}: {
    data: Record<string, any>,
    context: WorkflowContext,
    credential?: ExecutorCredential | null
}) {

    if (!credential) {
        throw new Error("Gemini credential missing")
    }
    try {

        const prompt = ResolveTemplate(data.UserPrompt ?? "", context)
        const systemInstruction = ResolveTemplate(data.SystemPrompt ?? "", context)

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
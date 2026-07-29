import { ResolveTemplate } from "../resolveTemplate"
import { geminiReqHandler } from "./geminiReqHandler"


export async function GeminiExecutor({
    data,
    context,
    credential
}: {
    data: any,
    context: any,
    credential: any
}) {

    if (!credential) {
        throw new Error("Gemini credential missing")
    }
    try {

        const prompt = ResolveTemplate(data.UserPrompt ?? "", context)
        const systemInstruction = ResolveTemplate(data.SystemPrompt ?? "", context)

        const response = await geminiReqHandler({
            apiKey: credential.value.apikey,
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
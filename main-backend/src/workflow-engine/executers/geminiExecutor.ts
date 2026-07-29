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
        const response = await geminiReqHandler({
            apiKey: credential.value.apikey,
            prompt: data.UserPrompt,
            systemInstruction: data.SystemPrompt
        })

        return {
            text: response,
        }
    } catch (err) {
        throw err;
    }
}
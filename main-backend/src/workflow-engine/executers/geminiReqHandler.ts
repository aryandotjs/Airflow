import { GoogleGenAI } from "@google/genai"

interface geminiReqOptions {
    apiKey: string,
    prompt: string,
    systemInstruction?: string
}


export async function geminiReqHandler({
    apiKey,
    prompt,
    systemInstruction }: geminiReqOptions) {

    try {
        const ai = new GoogleGenAI({ apiKey: apiKey })
        let args: any = {
            model: "gemini-3.1-flash-lite",
            contents: [prompt]
        }
        if (systemInstruction) {
            args.config = { systemInstruction }
        }
        const response = await ai.models.generateContent(args)
        return response.text || null

    } catch (error: unknown) {
        console.log(error)
        const ermsg = error instanceof Error ? error?.message : ""
        if (ermsg.includes("API key not valid")) {
            throw new Error("Gemini API key not valid")
        }
        if (ermsg.includes("You exceeded your current quota")) {
            throw new Error("Gemini API key limit exceeded")
        }
        throw new Error("Gemini request failed")
    }
}
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
            model: "gemini-2.5-flash",
            contents: [prompt]
        }
        if (systemInstruction) {
            args.config = { systemInstruction }
        }
        const response = await ai.models.generateContent(args)
        return response.text || null
    } catch (error: any) {
        console.log("gemini error api req", error)
        throw error
    }

}



const TEST_API_KEY = "AIzaSyBnVkwPQ8bx1QOuohoc1IoC2mFpzZP2EJo";

async function runTest() {
    console.log("Sending request to Gemini...");
    try {
        const result = await geminiReqHandler({
            apiKey: TEST_API_KEY,
            prompt: "give the best geeta quote you know in hinidi",

            systemInstruction: "take the things in the prompt and makea a tweet around 5 line "
        });

        console.log("Success! Response from Gemini:");
        console.log("------------------------------");
        console.log(result);
        console.log("------------------------------");
    } catch (error) {
        console.error("Test failed!");
    }
}

runTest();
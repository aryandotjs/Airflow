import { GoogleGenAI } from "@google/genai"
require('dotenv').config()

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



<<<<<<< HEAD

=======
>>>>>>> 3f38760 (Add credential support and improve workflow execution tracking)

const TEST_API_KEY = "AQ.Ab8RN6K0K86PMwU7ZJ-TZA3ILQjoW87IybOZTLoCZWPw8_rR9g"
async function runTest() {
    console.log("Sending request to Gemini...");
    try {
        console.log("api key ", TEST_API_KEY)
        const result = await geminiReqHandler({
            apiKey: TEST_API_KEY,
            prompt: "give the best geeta quote you know in hinidi",
            systemInstruction: "take the things in the prompt and makea a tweet around 5 line "
        });

//             console.log("Success! Response from Gemini:");
//             console.log("------------------------------");
//             console.log(result);
//             console.log("------------------------------");
//         } catch (error) {
//             console.error("Test failed!");
//         }
//     }

// runTest();
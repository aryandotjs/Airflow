import axios from "axios"



interface DiscordPayload {
    webhookUrl: string,
    messageTemplate: string,
    botusername: string,
    data: Record<string, any>
}
function templating(message: string, data: Record<string, any>): string {
    return message.replace(/\{\{(.*?)\}\}/g, (match, key) => {
        const clearkey = key.trim().replace('/^body\./', '')
        return data[clearkey] !== undefined ? String(data[clearkey]) : match
    })
}

export async function DiscordActionProcess(payload: DiscordPayload) {

    const { webhookUrl, messageTemplate, botusername, data } = payload

    if (!webhookUrl) throw new Error('missing discord webhook Url')

    const formattedmessage = templating(messageTemplate, data)
    try {
        const response = await axios.post(webhookUrl, {
            content: formattedmessage,
            username: botusername || "WorkflowBot"
        });

        return {
            success: true,
            status: response.status,
            timestamp: new Date().toISOString()
        };
    } catch (error: any) {
        const errormessages = error.response.data ? JSON.stringify(error.response.data) : error.message
        throw new Error(`discord webhook failed via Axios: ${errormessages}`)
    }
}


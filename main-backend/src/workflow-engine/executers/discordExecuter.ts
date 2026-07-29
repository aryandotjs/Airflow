import axios from "axios";
import { ResolveTemplate } from "../resolveTemplate";

export async function DiscordExecuter({
    data,
    context
}: {
    data: any,
    context: any
}) {

    console.log("Discord executor running");

    try {
        const message = ResolveTemplate(
            data.content,
            context
        )
        const response = await axios.post(data.webhookUrl, {
            content: message,
            username: data.username || "automation bot"
        })

        return {
            status: response.status,
            sent: true
        }
    } catch (err: any) {
        if (err.code === "ENOTFOUND" || err.response?.status === 404 || err.response?.status === 401) {
            throw new Error("Discord webhook is invalid or no longer exists")
        }
        throw new Error("Failed to send message to Discord")
    }
}
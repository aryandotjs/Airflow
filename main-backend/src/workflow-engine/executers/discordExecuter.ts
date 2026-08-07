import axios from "axios";
import { ResolveTemplate } from "../resolveTemplate.js";
import { WorkflowContext } from "../contex.js";
import { DiscordNodeData } from "../../types/node.js";

export async function DiscordExecuter({
    data,
    context
}: {
    data: unknown,
    context: WorkflowContext
}) {
    const discordData = data as DiscordNodeData
    console.log("Discord executor running");
    try {
        const message = ResolveTemplate(
            discordData.content,
            context
        )
        const response = await axios.post(discordData.webhookUrl, {
            content: message,
            username: discordData.username || "automation bot"
        })

        return {
            status: response.status,
            sent: true
        }
    } catch (err: unknown) {
        console.log(err)
        if (axios.isAxiosError(err) && (
            err.code === "ENOTFOUND" ||
            err.response?.status === 404 ||
            err.response?.status === 401
        )) {

            throw new Error("Discord webhook is invalid or no longer exists")
        }

        throw new Error("Failed to send message to Discord")
    }
}
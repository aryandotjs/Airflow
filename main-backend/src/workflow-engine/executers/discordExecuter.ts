import axios from "axios";
import { ResolveTemplate } from "../resolveTemplate.js";
import { WorkflowContext } from "../contex.js";

export async function DiscordExecuter({
    data,
    context
}: {
    data: Record<string, any>,
    context: WorkflowContext
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
    } catch (err: unknown) {
        console.log(err)
        if (err instanceof Error && (
            (err as any).code === "ENOTFOUND" ||
            (err as any).response?.status === 404 ||
            (err as any).response?.status === 401
        )) {

            throw new Error("Discord webhook is invalid or no longer exists")
        }

        throw new Error("Failed to send message to Discord")
    }
}
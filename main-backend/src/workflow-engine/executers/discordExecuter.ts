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

    const message = ResolveTemplate(
        data.content,
        context
    )

    const response = await axios.post(data.webhookUrl, {
        content: message,
        username: data.username
    })

    return {
        status: response.status,
        sent: true
    }
}
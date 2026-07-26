import axios from "axios";

export async function DiscordExecuter({
    data,
    context
}: {
    data: any,
    context: any
}) {

    console.log("Discord executor running");

    const message = ""

    const response = await axios.post(data.webhookUrl, {
        content: message,
        username: data.username
    })

    return {
        status: response.status,
        sent: true
    }
}
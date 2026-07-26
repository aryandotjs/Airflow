export async function httpExecuter(
    {
        data,
        context
    }: {
        data: any,
        context: any
    }) {
    console.log("HTTP executor running");

    const response = await fetch(data.Endpoint)

    const result = await response.json()

    return { status: 200, body: result }
} 
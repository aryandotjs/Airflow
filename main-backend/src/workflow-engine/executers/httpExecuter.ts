import axios from "axios";
import { ResolveTemplate } from "../resolveTemplate.js";
import { ResolveObjectTemplate } from "../ResolveObjectTemplate.js";
import type { WorkflowContext } from "../contex.js";

export async function httpExecuter(
    {
        data,
        context
    }: {
        data: Record<string, any>,
        context: WorkflowContext
    }) {
    console.log("HTTP executor running");

    const endpoint = ResolveTemplate(
        data.Endpoint || "",
        context
    )
    const RequestBody = ResolveObjectTemplate(
        data.RequestBody ? JSON.parse(data.RequestBody) : {},
        context
    )
    const RequestHeader = ResolveObjectTemplate(
        data.headers ? JSON.parse(data.headers) : {},
        context
    )
    let result;
    if (data.Method == "GET") {
        const response = await axios.get(endpoint, {
            headers: RequestHeader
        })
        result = await response.data
    }

    if (data.Method == "POST") {
        const response = await axios.post(endpoint, RequestBody, {
            headers: RequestHeader
        })
        result = await response.data
    }

    return { status: 200, body: result }
} 
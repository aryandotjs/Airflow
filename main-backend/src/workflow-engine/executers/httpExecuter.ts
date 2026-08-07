import axios from "axios";
import { ResolveTemplate } from "../resolveTemplate.js";
import { ResolveObjectTemplate } from "../ResolveObjectTemplate.js";
import type { WorkflowContext } from "../contex.js";
import { HttpNodeData } from "../../types/node.js";

export async function httpExecuter(
    {
        data,
        context
    }: {
        data: unknown,
        context: WorkflowContext
    }) {
    console.log("HTTP executor running");
    const httpdata = data as HttpNodeData
    const endpoint = ResolveTemplate(
        String(httpdata.Endpoint || ""),
        context
    )
    const RequestBody = ResolveObjectTemplate(
        httpdata.RequestBody ? JSON.parse(String(httpdata.RequestBody)) : {},
        context
    )
    const RequestHeader = ResolveObjectTemplate(
        httpdata.headers ? JSON.parse(String(httpdata.headers)) : {},
        context
    ) as Record<string, string>
    let result;
    if (httpdata.Method == "GET") {
        const response = await axios.get(endpoint, {
            headers: RequestHeader
        })
        result = await response.data
    }

    else if (httpdata.Method == "POST") {
        const response = await axios.post(endpoint, RequestBody, {
            headers: RequestHeader
        })
        result = response.data
    }
    else {
        throw new Error("Unsupported HTTP method");
    }

    return { status: 200, body: result }
} 
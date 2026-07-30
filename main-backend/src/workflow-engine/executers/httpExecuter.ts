import axios from "axios";
import { json } from "express";
import { ResolveTemplate } from "../resolveTemplate";
import { ResolveObjectTemplate } from "../ResolveObjectTemplate";

export async function httpExecuter(
    {
        data,
        context
    }: {
        data: any,
        context: any
    }) {
    console.log("HTTP executor running");

    const endpoint = ResolveTemplate(
        data.Endpoint || "",
        context
    )
    const RequestBody = ResolveObjectTemplate(
        JSON.parse(data.RequestBody) || {},
        context
    )
    const RequestHeader = ResolveObjectTemplate(
        JSON.parse(data.headers) || {},
        context
    )
    console.log(RequestBody)
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
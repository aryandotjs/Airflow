import axios from "axios";
import { json } from "express";
import { ResolveTemplate } from "../resolveTemplate";

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
        data.Endpoint,
        context
    )

    let result;
    if (data.Method == "GET") {
        const response = await axios.get(endpoint)
        result = await response.data
    }

    if (data.Method == "POST") {
        const response = await axios.post(data.Endpoint, JSON.parse(data.RequestBody))
        result = await response.data
    }

    return { status: 200, body: result }
} 
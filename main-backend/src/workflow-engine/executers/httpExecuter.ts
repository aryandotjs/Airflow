import axios from "axios";
import { json } from "express";

export async function httpExecuter(
    {
        data,
        context
    }: {
        data: any,
        context: any
    }) {
    console.log("HTTP executor running");
    console.log(data.RequestBody)
    console.log(JSON.parse(data.RequestBody))
    let result;
    // if (data.Method == "GET") {
    //     const response = await axios.get(data.Endpoint)
    //     result = await response.data.json()
    // }
    if (data.Method == "POST") {
        const response = await axios.post(data.Endpoint, JSON.parse(data.RequestBody))
        result = await response.data
    }

    return { status: 200, body: result }
} 
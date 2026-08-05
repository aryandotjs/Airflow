import { response } from "express"
import { httpExecuter } from "./executers/httpExecuter.js"
import type { Executor } from "./executor-types.js"
import { da } from "zod/locales"
import { DiscordExecuter } from "./executers/discordExecuter.js"
import { GeminiExecutor } from "./executers/geminiExecutor.js"

const executors: Record<string, Executor> = {
    "HTTP-REQUEST": httpExecuter,

    DISCORD: DiscordExecuter,

    GEMINI: GeminiExecutor,

    WEBHOOK: async ({ data }) => {
        return {
            success: true,
            response: "webhook"
        }
    },
    "TRIGGER-MANUALLY": async ({ data }) => {
        if (!data.data) {
            return {
                send: true
            }
        }
        const parsed = JSON.parse(data.data)
        data = {
            data: parsed,
            sent: true
        }
        return data
    },
    NOTION: async ({ data }) => {
        return {
            response: "fake gemini response"
        }
    },
    CLAUDE: async ({ data }) => {
        return {
            response: "fake gemini response"
        }
    },
    CHATGPT: async ({ data }) => {
        return {
            response: "fake gemini response"
        }
    },
    "GOOGLE-SHEET": async ({ data }) => {
        return {
            response: "fake gemini response"
        }
    },
    "GOOGLE-FORMS": async ({ data }) => {
        return {
            response: "fake gemini response"
        }
    }
}

export function getExecuter(type: string): Executor | undefined {
    return executors[type as keyof typeof executors]
}
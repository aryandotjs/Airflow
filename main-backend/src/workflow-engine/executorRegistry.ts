import { response } from "express"
import { httpExecuter } from "./executers/httpExecuter"
import type { Executor } from "./executor-types"
import { da } from "zod/locales"
import { DiscordExecuter } from "./executers/discordExecuter"

const executors: Record<string, Executor> = {
    "HTTP-REQUEST": httpExecuter,
    WEBHOOK: async ({ data }) => {
        return {
            success: true,
            response: "webhook"
        }
    },
    "TRIGGER-MANUALLY": async ({ data }) => {
        return {
            response: "trigged manually"
        }
    },
    DISCORD: DiscordExecuter,

    GEMINI: async ({ data }) => {
        return {
            response: "fake gemini response"
        }
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
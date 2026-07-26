import type { Executor } from "./executor-types"

const executors: Record<string, Executor> = {
    GEMINI: async ({ data }) => {
        return {
            response: "fake gemini response"
        }
    },
    DISCORD: async ({ data }) => {
        return {
            mess: "disc  response"
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
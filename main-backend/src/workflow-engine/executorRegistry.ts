const executors = {
    GEMINI: async () => {
        console.log("gemini executed")
    },
    DISCORD: async () => {
        console.log("discord executed")
    }
}

export function getExecuter(type: string) {
    return executors[type as keyof typeof executors]
}
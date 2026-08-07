
export type Workflowconnection = {
    id: string
    workflowId: string
    fromNodeId: string
    toNodeId: string
    fromOutput: string
    toInput: string
    createdAt: Date
    updatedAt: Date
}

export type WorkflowNode = {
    id: string
    workflowId: string
    name: string
    type: string
    position: {
        x: number
        y: number
    }
    data: Record<string, unknown>
    credentialId: string | null
    createdAt: Date
    updatedAt: Date,
    credential?: {
        id: string
        name: string
        type: string
        value: unknown
    } | null
}

export type HttpNodeData = {
    Endpoint?: string;
    Method?: "GET" | "POST";
    headers?: string;
    RequestBody?: string;
    variableName?: string
};

export type DiscordNodeData = {
    variableName?: string,
    webhookUrl: string,
    content: string,
    username?: string
};


export type GeminiNodeData = {
    variableName?: string,
    Credential: {
        name: string,
        id: string
    },
    SystemPrompt?: string,
    UserPrompt: string
};

export type ManualTriggerData = {
    data?: string,
    sent: boolean
};
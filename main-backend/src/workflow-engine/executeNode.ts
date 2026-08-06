import { prisma } from "../db/index.js";
import type { WorkflowContext } from "./contex.js";
import { getExecuter } from "./executorRegistry.js";

interface workflowNode {
    id: string;
    name: string;
    type: string;
    data: Record<string, any>;
    credential?: {
        id: string;
        name: string;
        type: string;
        value: unknown;
    } | null;
}

export async function executeNode(node: workflowNode, context: WorkflowContext) {

    const executer = getExecuter((node.name).toUpperCase())

    if (!executer) {
        throw new Error(
            `No executor found for ${(node.name).toUpperCase()}`
        );
    }

    const output = await executer({
        data: node.data,
        context,
        credential: node.credential
    })

    return {
        ...context,
        [node.data.variableName || node.name]: output
    };

}

import { prisma } from "../db";
import type { WorkflowContext } from "./contex";
import { getExecuter } from "./executorRegistry";

export async function executeNode(node: any, context: WorkflowContext) {

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

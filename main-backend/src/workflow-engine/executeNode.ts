import { prisma } from "../db/index.js";
import { WorkflowNode } from "../types/node.js";
import type { WorkflowContext } from "./contex.js";
import { getExecuter } from "./executorRegistry.js";



export async function executeNode(node: WorkflowNode, context: WorkflowContext) {

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
    const variableName =
        typeof node.data.variableName === "string"
            ? node.data.variableName
            : node.name;


    return {
        ...context,
        [variableName || node.name]: output
    };

}

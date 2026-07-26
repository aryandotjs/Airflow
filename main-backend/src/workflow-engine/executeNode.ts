import type { WorkflowContext } from "./contex";
import { getExecuter } from "./executorRegistry";

export async function executeNode(node: any, contex: WorkflowContext) {

    const executer = getExecuter(node.data.name)

    if (!executer) {
        throw new Error(
            `No executor found for ${node.data.name}`
        );
    }

    await executer()

    return {
        ...contex,
        [node.name]: "complete"
    };
}

import type { WorkflowContext } from "./contex";

export async function executeNode(node: any, contex: WorkflowContext) {
    console.log(`Executing node : ${node.name}`);
    return {
        ...contex,
        [node.name]: "complete"
    };
}

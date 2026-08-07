// import { WorkflowNode } from "../types/node.js";

// function mapPosition(position: unknown): {
//     x: number;
//     y: number;
// } {
//     if (
//         typeof position === "object" &&
//         position !== null &&
//         "x" in position &&
//         "y" in position &&
//         typeof position.x === "number" &&
//         typeof position.y === "number"
//     ) {
//         return {
//             x: position.x,
//             y: position.y
//         };
//     }

//     throw new Error("Invalid node position");
// }


// function mapData(data: unknown): Record<string, unknown> {
//     if (
//         typeof data === "object" &&
//         data !== null &&
//         !Array.isArray(data)
//     ) {
//         return data as Record<string, unknown>;
//     }

//     throw new Error("Invalid node data");
// }


// export function mapWorkflowNode(node: anny): WorkflowNode {
//     return {
//         id: node.id,
//         workflowId: node.workflowId,
//         name: node.name,
//         type: node.type,

//         position: mapPosition(node.position),

//         data: mapData(node.data),

//         credentialId: node.credentialId,

//         createdAt: node.createdAt,
//         updatedAt: node.updatedAt,

//         credential: node.credential
//             ? {
//                 id: node.credential.id,
//                 name: node.credential.name,
//                 type: node.credential.type,
//                 value: node.credential.value
//             }
//             : null
//     };
// }
// export function topologicalSort(
//     nodes: any[],
//     connections: any[]
// ) {
//     const graph = new Map<string, string[]>();
//     const indegree = new Map<string, number>();

//     // initialize nodes
//     for (const node of nodes) {
//         graph.set(node.id, []);
//         indegree.set(node.id, 0);
//     }


//     // create graph
//     for (const connection of connections) {

//         const from = connection.fromNodeId;
//         const to = connection.toNodeId;

//         graph.get(from)?.push(to);

//         indegree.set(
//             to,
//             (indegree.get(to) || 0) + 1
//         );
//     }


//     // find starting nodes
//     const queue: string[] = [];

//     for (const [nodeId, degree] of indegree) {
//         if (degree === 0) {
//             queue.push(nodeId);
//         }
//     }


//     const result: any[] = [];


//     while (queue.length > 0) {

//         const current = queue.shift()!;

//         const node = nodes.find(
//             n => n.id === current
//         );

//         if (node) {
//             result.push(node);
//         }


//         for (const neighbour of graph.get(current) || []) {

//             indegree.set(
//                 neighbour,
//                 indegree.get(neighbour)! - 1
//             );


//             if (indegree.get(neighbour) === 0) {
//                 queue.push(neighbour);
//             }
//         }
//     }


//     return result;
// }


export function topologicalSort(nodes: any[],
    connections: any[]) {

    const graph = new Map<string, string[]>()
    const indegree = new Map<string, number>()

    for (const node of nodes) {
        graph.set(node.id, [])
        indegree.set(node.id, 0)
    }

    for (const connection of connections) {
        const from = connection.fromNodeId
        const to = connection.toNodeId
        graph.get(from)?.push(to)

        indegree.set(to, (indegree.get(to) || 0) + 1)
    }

    console.log("graph")
    console.log(graph)

    console.log("indegree")
    console.log(indegree)

}

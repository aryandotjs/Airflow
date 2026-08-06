import { WorkflowContext } from "./contex.js";


export interface ExecutorCredential {
    id: string;
    name: string;
    type: string;
    value: unknown;
}


export type Executor = (params: { data: Record<string, any>, context: WorkflowContext, credential?: ExecutorCredential | null }) => Promise<unknown>
import { WorkflowContext } from "./contex.js"
import { ResolveTemplate } from "./resolveTemplate.js"

export function ResolveObjectTemplate(value: any, context: WorkflowContext): any {

    if (typeof value === "string") {
        return ResolveTemplate(value, context)
    }

    if (value && typeof value === "object") {
        const result: any = {}

        for (const key in value) {
            result[key] = ResolveObjectTemplate(value[key], context)
        }

        return result
    }

    return value
}

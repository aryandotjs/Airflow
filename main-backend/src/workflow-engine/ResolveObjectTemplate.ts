import { ResolveTemplate } from "./resolveTemplate"

export function ResolveObjectTemplate(value: any, context: any): any {

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

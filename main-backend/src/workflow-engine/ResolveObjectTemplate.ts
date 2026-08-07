import type { JsonObject, JsonValue } from "../types/json.js";
import { WorkflowContext } from "./contex.js";
import { ResolveTemplate } from "./resolveTemplate.js";

export function ResolveObjectTemplate(
    value: JsonValue,
    context: WorkflowContext
): JsonValue {

    if (typeof value === "string") {
        return ResolveTemplate(value, context);
    }

    if (Array.isArray(value)) {
        return value.map((item) =>
            ResolveObjectTemplate(item, context)
        );
    }

    if (value && typeof value === "object") {
        const result: JsonObject = {};

        for (const key in value) {
            result[key] = ResolveObjectTemplate(
                value[key],
                context
            );
        }

        return result;
    }

    return value;
}
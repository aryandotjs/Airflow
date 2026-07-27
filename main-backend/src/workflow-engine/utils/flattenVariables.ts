const context = {
    "AddingUserVariable": {
        status: 200,
        body: {
            msg: "user created",
            user: {
                name: "aryan",
                from: "udr",
                profile: "swe"
            },
            channel: "sunday-running-club",

        }
    }
}

export function FlattenVariables(
    obj: any,
    prefix = ""
): string[] {

    let veriables: string[] = [];

    Object.keys(obj).forEach((key) => {
        const path = prefix ? `${prefix}.${key}` : key

        if (typeof obj[key] === "object" && obj[key] !== null) {
            veriables.push(...FlattenVariables(obj[key], path))
        } else {
            veriables.push(path);
        }

    })
    return veriables
}

// console.log(FlattenVariables(context))
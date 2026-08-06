export function ResolveTemplate(text: string, webhookbody: Record<string, unknown>, startDelimeter = "{{", endDelimeter = "}}") {
    let start = 0;
    let end = 0;
    let finalString = "";
    while (text.length > start) {

        if (startDelimeter === text.slice(start, start + 2)) {
            let endpoint = start
            while (text.slice(endpoint, endpoint + 2) !== endDelimeter) {
                endpoint++
            }
            const part = text.slice(start + 2, endpoint)
            const words = part.split(".")

            let Valueobj: any = {
                ...webhookbody
            }
            for (let i = 0; i < words.length; i++) {
                if (Valueobj && Valueobj[words[i]] !== undefined) {
                    Valueobj = Valueobj[words[i]]
                } else {
                    Valueobj = undefined;
                    break;
                }
            }
            finalString += Valueobj !== undefined ? Valueobj : text.slice(start, endpoint + 1)
            start = endpoint + 1

            start++
        } else {
            finalString += text[start]
            start++
            end++
        }
    }
    return finalString;
}
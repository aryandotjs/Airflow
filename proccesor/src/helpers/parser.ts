
export function Parser(text: string, webhookbody: any, startDelimeter = "{{", endDelimeter = "}}") {
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
            const words: any = part.split(".")

            let Valueobj = {
                ...webhookbody
            }
            console.log(words, Valueobj)
            for (let i = 0; i < words.length; i++) {
                if (Valueobj && Valueobj[words[i]] !== undefined) {
                    Valueobj = Valueobj[words[i]]
                } else {
                    Valueobj = undefined;
                    break;
                }
            }
            finalString += Valueobj !== undefined ? Valueobj : text.slice(start, endpoint + 1)
            start = endpoint + 2

            start++
        } else {
            console.log(finalString)
            finalString += text[start]
            start++
            end++
        }
    }
    return finalString;
}

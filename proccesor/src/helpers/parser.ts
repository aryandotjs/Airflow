
export function Parser(text: string, webhookbody: any, startDelimeter = "{{", endDelimeter = "}}") {

    let start = 0;
    let end = 0;
    let finalString = "";

    while (text.length > start) {

        if (startDelimeter === text[start]) {
            let endpoint = start
            while (text[endpoint] !== endDelimeter) {
                endpoint++
            }

            const part = text.slice(start + 1, endpoint)
            const words: any = part.split(".")
            let Valueobj = {
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
            start = endpoint

            start++
        } else {
            finalString += text[start]
            start++
            end++
        }

    }
    return finalString;
}


const a = Parser('hi my name is {{body.name}}',
    {
        body: {
            name: "aryan"
        }
    }
)
console.log(a)

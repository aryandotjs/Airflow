
export function Parser(text: string, webhookbody: any, startDelimeter = "{", endDelimeter = "}") {

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


// Parser('hi my name is {body.name}! iam from {body.village.name} how are you iam in the vard no.{body.village.vard}', {
//     body:
//     {
//         name: 'aryan', village: {
//             name: "chawand",
//             vard: 111
//         },
//     }
// })

// export function parse(text: string, values: any, startDelimeter = "{", endDelimeter = "}") {
//     // You received {comment.amount} momey from {comment.link}
//     let startIndex = 0;
//     let endIndex = 1;

//     let finalString = "";
//     while (endIndex < text.length) {

//         if (text[startIndex] === startDelimeter) {
//             let endPoint = startIndex + 2;

//             while (text[endPoint] !== endDelimeter) {

//                 endPoint++;
//             }
//             let stringHoldingValue = text.slice(startIndex + 1, endPoint);
//             const keys: any = stringHoldingValue.split(".");
//             let localValues = {
//                 ...values
//             }


//             for (let i = 0; i < keys.length; i++) {
//                 if (typeof localValues === "string") {
//                     localValues = JSON.parse(localValues);
//                 }
//                 localValues = localValues[keys[i]];
//             }

//             finalString += localValues;
//             startIndex = endPoint + 1;
//             endIndex = endPoint + 2;

//         } else {
//             finalString += text[startIndex];
//             startIndex++;
//             endIndex++;
//         }

//     }



//     if (text[startIndex]) {
//         finalString += text[startIndex]
//     }
//     console.log(finalString)

//     return finalString;
// }
// // console.log(
// parse("momey  {comment.amount.first.my} from", {
//     comment: {
//         amount: {
//             first: {
//                 my: 1111
//             }
//         },
//         link: "http.st"
//     }
// })
// // )
/** i am going to use try/catch wrapper block to compile for safe regex*/

export function compileRegex(input, flags= 'i'){
    if (!input || input.trim()=== "") return null;
    try{
        return new RegExp(input, flags);
    }catch(e){
        return null; // i am returning null if the user types invalid partial characters
    }
}

// I will wrap matching text strings inside a standard <mark> tag for live highlighting

export function highlightText(text, regex){
    if (!regex || typeof text !== 'string') return text;
    return text.replace(regex, (match) => {
        const securedMatch = match
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
        return `<mark>${securedMatch}</mark>`;
    });
}
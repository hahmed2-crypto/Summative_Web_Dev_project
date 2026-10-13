//t will collapse multiple spaces inot one space.
export function normalizeText(value){
    if (typeof value !=="string") return "";
    return value.replace(/\s+/g, " ");
}

/**I think i need to normalize trailing or leading spaces after i normalized so that we can reject the empty string as well after normalization.*/
export function validateDescription(value){

    if(typeof value !=="string"){ /**ALways going to check as for safety*/
        return{
            valid:false,
            message:"Descriiption must be string"
        };
    }

    const descriptionPattern=/^\S(?:.*\S)?$/;

    if(!descriptionPattern.test(value)){ //this allows me to check when someone puts only space or just the field is empty.
        if (value.trim()===""){
            return{
                valid:false,
                message: "Description is required."
             };
        };

        return{
            valid: false,
            message:"Description cannot have laeding or trailing spaces."
        };
    }

    // Otherwise, it passed our patterns and should be returned.
    return{
        valid: true,
        message: ""
    };
}
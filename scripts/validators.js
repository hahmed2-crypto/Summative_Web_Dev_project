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

//I am going to work on the validateAmount with regex here

export function validateAmount(value){
    if (typeof value!== "string"){
        return{valid: false, message: "Amount must be a string input."};
    }

    // here is my regex pattern matching:
    const amountPattern=/^(0|[1-9]\d*)(\.\d{1,2})?$/;

    if(!value ||value.trim()===""){
        return{valid:false,message:"Amount is required"};
    }

    if (!amountPattern.test(value)){
        return{
            valid: false,
            message: "Amount must be greater than 0"};
    }

    const parsedAmount=parseFloat(value);
    if (parsedAmount <=0){
        return {
            value: false,
            message: "Amount must be greater than 0"};
    }

    return{
        valid:true,
        message: ""
    };
}

// here i will be writing my codes for validating Date

export function validateDate(value){
    if (typeof value !== "string"){
        return{
            valid: false,
            message: "Date must be a string input"};
        }

        // creating my pattern matching for dates here
        const datePattern= /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        if (!value || value.trim()===""){
            return{
                valid: false,
                message: "Date is required"};
            }

        if (!datePattern.test(value)){
            return{
                valid: false,
                message: "Date must be in YYYY-MM-DD format"};
            }
        // we will check if the valid dat in the string format is in the actual calend with this validation
        const dateObject= new Date(value);
        if(isNaN(dateObject.getTime())){
            return {
                valid: false,
                message: "The input date does not exist on the calendar"
            }
        return{
            valid:true,
            message: ""
    };
}

//here i will be making sure that to validate selected or added categories allows letters, internal single spaces, and internal hyphens.

export function validateCategory(value){
    if(typeof value !=="string"){
        return{
            valid: false,
            message: "Category must a string input"
        };
    }

    //setting up the Pattern for validating the letters, internal spacing to single and internapl hyphens.
    const categoryPattern= /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

    if (!value || value.trim()=== ""){
        return{
            valid:false,
            message: "Category selection is required"
        };
    }

    if (!categoryPattern.test(value)){
        return{
            valid:false,
            message: "Category can only contain letters, single spaces, or hyphens"
        };
    }

    return{
        valid:true,
        message: ""
    };
    //done with selection validation
}


//i also need to catch the consecutive duplicate words that could the user input

export function hasDuplicateWords(value){
    if (typeof value !== "string")
        return false;

    const duplicatePattern= /\b(\w+)\s+\1\b/i;
    return duplicatePattern.test(value);
};


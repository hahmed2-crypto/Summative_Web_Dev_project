const STORAGE_KEY = 'finance_tracker_records';
const SETTINGS_KEY = 'finance_tracker_settings';

//Defualt settings
const DEFAULT_SETTINGS={
    budgetCap: 0,
    rateUsd: 1450,
    rateNaira: 1.11,
    rateShilling: 11.36,
    categories: ["Food", "Books", "Transport", "Fees", "Entertainment", "Other"]
};

//this will load data from localStorage 
export function loadRecords(){
    try{
        const data=localStorage.getItem(STORAGE_KEY);
        return data? JSON.parse(data) : [];

    }catch(e){
        console.error("Error reading localStorage data:", e);
        return[];
    }
}

//we will save the records to localStorage
export function saveRecords(records){
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }catch(e){
        console.error("Error saving data to localStorage:", e);
    }
}
// if it does not exit, we gonna load to defualt values
export function loadSettings(){
    try{
        const data= localStorage.getItem(SETTINGS_KEY);
        if (!data){
            return DEFAULT_SETTINGS;
        }


        //merge save option over defaults safely
        const parsed= JSON.parse(data);
        return Object.assign({}, DEFAULT_SETTINGS, parsed);

    }catch(e){
        return {
            budgetCap: 0,
            rateUsd: 1450,
            rateNaira: 1.11,
            rateShilling: 11.36,
            categories: ["Food", "Books", "Transport", "Fees", "Entertainment", "Other"]
        };
    }
}


//I will save all budget targets and currency exchange values/numbers to storage

export function saveSettings(settings){
    try{
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }catch(e){
        console.error("Error saving settings data to localStorage:", e);
    }
}
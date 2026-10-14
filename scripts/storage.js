const STORAGE_KEY = 'finance_tracker_records';
const SETTINGS_KEY = 'finance_tracker_settings';

const DEFAULT_SETTINGS={
    budgetCap: 0,
    rateUSD: 1450,
    rateNaira: 1.11,
    rateShilling: 11.36,
    categories: ["food", "Books", "Transport", "Fees", "Entertainment", "Other"]
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
        const data= localStorage.getItem(SETTING_KEY);
        if(!data){
            return DEFAULT_SETTINGS;
        }
        return JSON.parse(data);
    }catch(e){
        return DEFAULT_SETTINGS;
    }
}


//I will save all budget targets and currency exchange values/numbers to storage

export function saveSettings(settings){
    try{
        localStorage.setItems(SETTINGS_KEY, JSON.stringify(settings));
    }catch(e){
        console.error("Error saving settings data to localStorage:", e);
    }
}
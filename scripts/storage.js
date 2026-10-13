const STORAGE_KEY = 'finance_tracker_records';

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
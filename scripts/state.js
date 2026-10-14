import {loadRecords, saveRecords, loadSettings, saveSettings} from "./storage.js";
//I will be creating a global render which changes subscriber hook array
const listeners = [];
export const state={
    records: loadRecords(), //loads from stroage
    settings: loadSettings(), //persistant cap, rates, and category arrays
    searchPattern: null,
    searchCaseInsensitive: true, //case-insensitive matching flag
    searchError: "",
    currentSort:{
        key: 'date',
        direction: 'desc'
    }
};
//creating a unique and sequential record string IDS safely, and protects agains duplicate IDs even after records are deleted.
export function generateUniqueID(){
    if (state.records.length === 0) return "rec_0001";
    const numericalIds= state.records.map(rec=> {
        const match=rec.id.match(/\d+/);
        return match ? parseInt(match[0], 10): 0;
    });

    const highestId = Math.max(...numericalIds, 0);
    const nextId= highestId+1;
    return `rec_${nextId.toString().padStart(4, '0')}`;
}

// Data helper function to create and append a new transaction record with rubric timestamps.

export function addRecord(description, amount, category, date){
    const nowIso= new Date().toISOString();
    const newRecord = {
        id: generateUniqueID(),
        description,
        amount: parseFloat(amount),
        category, date,
        createdAt: nowIso,
        updatedAt: nowIso
    };
    setRecords([...state.records, newRecord]);
}

// removing transactions by unique ID ,
export function deleteRecord(id){
    const updated = state.records.filter(rec => rec.id !== id);
    setRecords(updated);
}

//a function to allow the user to modify or edit an existing transaction record inline.
export function editRecord(id, updatedFields){
    const updated= state.records.map(rec => {
        if (rec.id === id){
            return{
                ...rec, ...updatedFields,
                updatedAt: new Date().toISOString()
            };
        }
        return rec;
    });
    setRecords(updated)
}

// function that connects ui.js to state changes
export function onChange(callback){
    if(typeof callback === "function"){
        listeners.push(callback);
    }
}

//screen updator for automatic updates to alert listeners
export function setRecords(newRecords){
    state.records= newRecords;
    saveRecords(state.records);

    listeners.forEach(callback => callback());
}

// a funcition to update setings and auto-save them
export function updateSettings(newSettings){
    state.settings = {...state.settings, ...newSettings};
    saveSettings(state.settings);
    listeners.forEach(callback => callback())
}
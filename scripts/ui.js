
import {state} from "./state.js";
import {highlightText} from "./search.js";


// safely escaping raw strings to prevent HTML cross-Site Injection failures
function escapeHTML(str){
    if (typeof str !== 'string') return str;
    return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "'");
}

//calculating dashboard statistics and updates budget cap targets safely
export function calculateDashboardStates(){
    const records = state.records;
    const settings= state.settings;

    let totalRecordsSum= records.length;
    let totalSpentSum= 0;
    
    for (let i= 0; i < records.length; i++){
        totalSpentSum= totalSpentSum + records[i].amount;
    }

    const totalRecordsCard= document.getElementById("metric-total-records");
    if (totalRecordsCard){
        totalRecordsCard.textContent= totalRecordsSum;
    }

    const totalSpentCard= document.getElementById("metric-total-spent");
    if (totalSpentCard){
        totalSpentCard.textContent= totalSpentSum.toFixed(2)+ " RWF";
    }

    //Identifying top category safely 

    const categoryCounts= {};
    let topCategoryName= "No data yet";
    let highestCount= 0;

    for (let i=0; i < records.length; i++){
        const cat= records[i].category;
        if(categoryCounts[cat]=== undefined){
            categoryCounts[cat]= 1;

        }else{
            categoryCounts[cat]= categoryCounts[cat]+1;
        }
        
        if(categoryCounts[cat]> highestCount){
            highestCount= categoryCounts[cat];
            topCategoryName= cat;
        }
    }

    const topCategoryCard= document.getElementById("metric-top-categories");
    if(topCategoryCard){
        if(records.length===0){
            topCategoryCard.innerHTML= "<li>No data yet</li>";
        } else{
            topCategoryCard.innerHTML= `<li>${escapeHTML(topCategoryName)} (${highestCount})</li>`;
        }
    }


    // Aria Live region overage management logic

    const budgetStatusField= document.getElementById("budget-status");
    if(budgetStatusField){
        const parsedCap= parseFloat(settings.budgetCap) || 0;
        if (parsedCap<=0){
            budgetStatusField.textContent = "No budget cap configured in settings.";
            budgetStatusField.setAttribute("aria-live", "polite");

        }else{
            const remainingBalance= parsedCap - totalSpentSum;
            if(remainingBalance >=0){
                budgetStatusField.textContent= remainingBalance.toFixed(2) + " RWF remaining under your cap";
                budgetStatusField.setAttribute("aria-live", "polite");
            }else{
                const overageAmount= Math.abs(remainingBalance);
                budgetStatusField.textContent= "Warning: Budget cap exceeded by " + overageAmount.toFixed(2) + " RWF";
                budgetStatusField.setAttribute("aria-live", "assertive");
            }
        }
    }
}

// in this file i wil be processing, filtering, sorting, and rendering transactions model dynamically into the DOM view area.

export function renderRecords(){
    const tbody= document.getElementById("records-tbody");
    if (!tbody) return;
    tbody.innerHTML= "";
    // I am going to apply regex live search regex filter algoriths
    let filtered= [...state.records];
    if (state.searchPattern){
        filtered= filtered.filter(rec =>
            state.searchPattern.test(rec.description)||
            state.searchPattern.test(rec.category)||
            state.searchPattern.test(rec.amount.toString())||
            state.searchPattern.test(rec.date)
        );
    }

    //i am going to pply column sorting criteria
    const {key, direction} = state.currentSort;
    filtered.sort((a,b) => {
        let valA= a[key];
        let valB= b[key];

        if (typeof valA==='string'){
            return direction==='asc'
            ?valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }else{
            //numeric comparison for amounts
            return direction==='asc' ? valA-valB: valB-valA;
        }
    
    });


// we are going to render
if (filtered.length===0){
    tbody.innerHTML= `<tr><td colspan="5" style="text-align: center;">No transaction records found your filters.</td></tr>`;
    return;
}

filtered.forEach(record =>{
    const tr= document.createElement("tr");

    //safely display strings
    const cleanDesc= escapeHTML(record.description);
    const cleanCat= escapeHTML(record.category);
    const cleanDate= escapeHTML(record.date);

    //displaying amount using to fixed
    const displayAmount= record.amount.toFixed(2);

    //wrap rendering text entries within highlight modules
    const descHTML = highlightText(cleanDesc, state.searchPattern);
    const catHTML = highlightText(cleanCat, state.searchPattern);
    const dateHTML = highlightText(cleanDate, state.searchPattern);

    const amountHTML =highlightText(displayAmount, state.searchPattern);


    tr.innerHTML= `
        <td data-label="Date">${dateHTML}</td>
        <td data-label="Description">${descHTML}</td>
        <td data-label="Category">${catHTML}</td>
        <td data-label="Amount (RWF)">${amountHTML}</td>
        <td data-label="Actions">
            <button type="button" class="btn-delete" data-id="${record.id}">Delete</button>
        </td>
    `;
    tbody.appendChild(tr);
});    
    //updatin table header arrows visual indicator layout states
    const statusBox = document.getElementById("records-status");
    if (statusBox){
        statusBox.textContent= `showing ${filtered.length} transaction records.`;
    }
}

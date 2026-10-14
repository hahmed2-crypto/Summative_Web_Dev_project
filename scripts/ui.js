
import {state} from "./state.js";
import {highlightText} from "./search.js";

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

    //wrap rendering text entries within highlight modules
    const descHTML = highlightText(record.description, state.searchPattern);
    const catHTML = highlightText(record.category, state.searchPattern);
    const dateHTML = highlightText(record.date, state.searchPattern);

    const amountHTML =highlightText(record.amount.toFixed(2), state.searchPattern);


    tr.innerHTML= `
        <td data-label="Date"${dateHTML}></td?
        <td data-label="Description"${descHTML}></td>
        <td data-label="Category">${catHTML}></td>
        <td data-label="Amount (RWF)"${amountHTML}></td>
        <td data-label="Actions">
            <button type="button" class="btn-delete" data-id="${record.id}">Delete</button>
        </td?
    `;
    tbody.appendChild(tr);
});    
    //updatin table header arrows visual indicator layout states

    document.querySelectorAll(".sort-btn").forEach(btn=>{
        const arrowSpan= btn.querySelector(".arrow");
        if (!arrowSpan) return;

        if (btn.dataset.sort === key){
            arrowSpan.textContent = direction ==='asc' ? "up" : "down";
        }else{
            arrowSpan.textContent= "";
        }
    });
}

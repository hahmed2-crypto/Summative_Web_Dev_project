import{ state, addRecord, deleteRecord, onChange, updateSettings, setRecords} from "./state.js";
import{renderRecords, calculateDashboardStates,} from "./ui.js";
import{compileRegex} from "./search.js";
import{
    normalizeText,
    validateDescription,
    validateAmount,
    validateDate,
    validateCategory
} from "./validators.js";

document.addEventListener("DOMContentLoaded", () =>{
    //core structure for interface to refresh the entire UI view area
    const updateUI= () => {
        renderRecords();
        calculateDashboardStates();
        syncSettingsToInput();
        syncCategoryDropdown();
    };

    // data registration layer tfor my UI update helper to run whenever data states change

    onChange(updateUI);
    // I need to call all the standard HTML forma and input elements
    const settingsForm= document.getElementById("settings-form");
    const transactionForm= document.getElementById("transaction-form");
    const searchInput= document.getElementById("search");
    const searchError= document.getElementById("search-error");
    const caseCheckbox= document.getElementById("case-insensitive");
    const sortBySelect= document.getElementById("sort-by");
    const addCategoryBtn= document.getElementById("add-category-btn");
    const newCategoryInput=document.getElementById("new-category");
    const newCategoryError= document.getElementById("new-category-error");
    const exportBtn= document.getElementById("export-btn");
    const importFileInput= document.getElementById("import-file");
    const categorySelect=document.getElementById("category");
    // i need to create function that puts the saved settings values from state back into the HTML input boxes
    function syncSettingsToInput(){
        const usdField= document.getElementById("rate-usd");
        const nairaField= document.getElementById("rate-nigerian-naira");
        const shillingField= document.getElementById("rate-kenyan-shilling");
        const capField= document.getElementById("budget-cap");

        if(usdField && document.activeElement !== usdField){
            usdField.value=state.settings.rateUsd || "";
        }

        if(nairaField && document.activeElement !== nairaField){
            nairaField.value=state.settings.rateNaira || "";
        }

        if(capField && document.activeElement !== capField){
            capField.value = state.settings.budgetCap || "";
        }

        if(shillingField && document.activeElement !== shillingField){
            shillingField.value= state.settings.rateShilling || "";
        }
    }

    // this will update the HTML options in our category selector dynamically
    function syncCategoryDropdown(){
        if (!categorySelect) return;

        const activeValue= categorySelect.value;
        let dynamicOptions= `<option value= ""> Select a category</option>`;
        for (let i=0; i <state.settings.categories.length; i++){
            const currentCat= state.settings.categories[i];
            dynamicOptions= dynamicOptions + `<option value="${currentCat}">${currentCat}</option>`;
        }

        categorySelect.innerHTML= dynamicOptions;
        categorySelect.value= activeValue; //keeps previous option that is being selected
    }

    //I will add here program that will handle adding a new transaction record from the submission form
    if(transactionForm){
        transactionForm.addEventListener("submit", function(e){
            e.preventDefault();
            const descInput= document.getElementById("description");
            const amtInput= document.getElementById("amount");
            const dateInput= document.getElementById("date");

            const descError= document.getElementById("description-error");
            const amtError= document.getElementById("amount-error");
            const dateError= document.getElementById("date-error");
            const catError=document.getElementById("category-error");

            let isFormValid= true;
            // reseting my error labels explicityly
            if(descError) descError.textContent= "";
            if(amtError) amtError.textContent= "";
            if(dateError) dateError.textContent= "";
            if(catError) catError.textContent= "";


            //resetting my validation error css styles explicitly
            if(descInput) descInput.classList.remove("input-error");
            if(amtInput) amtInput.classList.remove("input-error");
            if(dateInput) dateInput.classList.remove("input-error");
            if(categorySelect) categorySelect.classList.remove("input-error");


            //processing description validations
            const descVal= validateDescription(descInput.value);
            if(!descVal.valid){
                descError.textContent= descVal.message;
                descInput.classList.add("input-error");
                isFormValid= false;
            }


            //processing amount validations

            const amtVal= validateAmount(amtInput.value);
            if(!amtVal.valid){
                amtError.textContent = amtVal.message;
                amtInput.classList.add("input-error");
                isFormValid= false;
            
            }


            //processing date validation
            const dateVal= validateDate(dateInput.value);
            if(!dateVal.valid){
                dateError.textContent= dateVal.message;
                dateInput.classList.add("input-error");
                isFormValid= false;
            }


            //processing category selector validations
            const catVal= validateCategory(categorySelect.value);
            if(!catVal.valid){
                catError.textContent= catVal.message;
                categorySelect.classList.add("input-error");
                isFormValid= false;
            }

            // this will pass everything in clean text, and save it to record array

            if(isFormValid){
                const cleanDesc= normalizeText(descInput.value);
                addRecord(cleanDesc,
                    amtInput.value,
                    categorySelect.value,
                    dateInput.value
                    
                );
                transactionForm.reset();
                alert("Transaction added successfully!");

            }else{
                // will let it focus on the first element that has an input error style
                if(descInput.classList.contains("input-error")){
                    descInput.focus();
                } else if(amtInput.classList.contains("input-error")){
                    amtInput.focus();
                } else if(categorySelect.classList.contains("input-error")){
                    categorySelect.focus();
                }else if(dateInput.classList.contains("input-error")){
                    dateInput.focus();
                }

            }
        });
    }
    // i will write the function that handles the live regex matching search inputs

    function handleLiveSearch(){
        if(!searchInput) return;
        const textToFind= searchInput.value;

        let matchingFlags= "";
        if(caseCheckbox && caseCheckbox.checked){
            matchingFlags= "i";

        }

        if(searchError) searchError.textContent= "";

        if(!textToFind || textToFind.trim()=== ""){
            state.searchPattern= null;
            renderRecords();
            return;
        }

        const generatedPattern= compileRegex(textToFind, matchingFlags);
        if(generatedPattern){
            state.searchPattern= generatedPattern;
        } else{
            if(searchError) searchError.textContent= "Invalid search matching pattern syntax.";
            state.searchPattern= null;

        }
        renderRecords();
    }

    if(searchInput) searchInput.addEventListener("input", handleLiveSearch);
    if(caseCheckbox) caseCheckbox.addEventListener("change", handleLiveSearch);

    // I will handle column data table sorting criteria changes
    if(sortBySelect){
        sortBySelect.addEventListener("change", function(e){
            const targetParts= e.target.value.split("-");
            state.currentSort={
                key: targetParts[0],
                direction: targetParts[1]
            };
            renderRecords();
        });
    }

    //handling the direct user settings input entries to auto-save configuration numbers
    if(settingsForm){
        settingsForm.addEventListener("input", function(e){
            if(e.target.id=== "new-category") return; //ignore typing inside the new category block

            const usdVal= document.getElementById("rate-usd").value;
            const nairaVal= document.getElementById("rate-nigerian-naira").value;
            const shillingVal= document.getElementById("rate-kenyan-shilling").value;
            const budgetCapVal= document.getElementById("budget-cap").value;

            updateSettings({
                rateUsd: parseFloat(usdVal) || 0,
                rateNaira: parseFloat(nairaVal) || 0,
                rateShilling: parseFloat(shillingVal) || 0,
                budgetCap: parseFloat(budgetCapVal) || 0
            });
        });

    }

    // this will allow the user to add a new uniquie text option to category settings
    if (addCategoryBtn && newCategoryInput){
        addCategoryBtn.addEventListener("click", function(){
            if (newCategoryError) newCategoryError.textContent= "";
            newCategoryInput.classList.remove("input-error");

            const rawCatValue= newCategoryInput.value;
            const validatedObj= validateCategory(rawCatValue);

            if(!validatedObj.valid){
                if(newCategoryError) newCategoryError.textContent= validatedObj.message;
                newCategoryInput.classList.add("input-error");
                return;
            }

            const cleanCategoryName= normalizeText(rawCatValue);
            let isDuplicate = false;
            for(let i= 0; i < state.settings.categories.length; i++){
                if(state.settings.categories[i].toLowerCase()=== cleanCategoryName.toLowerCase()){
                    isDuplicate= true;
                    break;
                }
            };
        })
    
            
        
    }
    // a program that will allow all the seeding files
    if(importFileInput){
        importFileInput.addEventListener("change", function(e){
            const selectFiles= e.target.files;
            if(!selectFiles || selectFiles.length === 0) return;

            const reader= new FileReader();
            reader.onload= function(event){
                try{
                    const parsedPackage= JSON.parse(event.target.result);
                    if(parsedPackage){
                        if(Array.isArray(parsedPackage)){
                            setRecords(parsedPackage);
                        }else{
                            if(parsedPackage.records && Array.isArray(parsedPackage.records)){
                                setRecords(parsedPackage.records);
                            } 
                            if(parsedPackage.settings){
                                updateSettings(parsedPackage.settings);
                            }
                        }
                        alert("Application data package restored successfully!");
                        importFileInput.value= "";
                    }    

                } catch(err){
                    alert("Failed to parse file.Ensure it is valid JSON");
                }
            };

            reader.onerror= function(){
                alert("could not read the selected file.");
            
            };

            reader.readAsText(selectFiles[0]);
        
        });
    }
    
    updateUI();
}); 

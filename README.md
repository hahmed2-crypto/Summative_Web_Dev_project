# Student Finance Tracker 
# Links
1. Live URL: https://hahmed2-crypto.github.io/Summative_Web_Dev_project/
2. ---Video--- (to be recorded soon)


## Overview
This is a website that is for students who want manage their finance resposibly. It allows them to monitor, add thier spending. it allows them to see their weekly spending. IT allows them also budget for monthly budgiting. 
## Features

- Transaction add button - allows the user to add their spending item(description), with date,money and what type of category it is.(Inprogress)
- Currency Conversion - it allows the user to manually convert the amount which has base transfer currency of RWF to either naira, usd or kenyan shilling.(Inprogress)
- Categories - this feature is a feaure that allows the user to add new category if they feel like they need new category(Inprogress)
- Export and Import Data- this feature allows the user to upload or download data(Export function(Inprogress), import function (Inprogress))
- Records - records comes with search button that allows the user to search through their data and another select area where they can sort the data by date from oldest to newest, amount from high to low, and description with A-Z.

- Record Table Feature - It is a table that allows the user to see the recorded data which will be deplayed as Date, Description, Category, Amount(RWF) Actions


# Regex Catalog:
| **Field** **Pattern** **Checks** **Passes** **Fails** **Why I chose this**
|---|---|---|---|---|---|
|Description | ^\S(?:.*\)?$ | No leading or trailing space | `Lunch` | `Lunch` |  |
|Date | `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$` | YYYY-MM-DD shape(plus UTC real calender check in code) | 2021-02-29 | 2026-02-30 |   |
|Amount | `^(0|[1-9]\d*)(\.\d{1,2})?$` | Digits, no leading zeros, up to 2 decimals | `12.50 012`, `12.345` |  |
|Category | `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` | letters, single spaces, hyphens | `Health-Care` | `Food2` |  |
|Duplicate words | `\b(\w+)\s+\1\b` (it is for case-insensitive) | repeated word(back-reference) | |
# Justifications for Tested Items:
- Skip link:
- tab order: 
- focus rings: 
- form submit: I allowed the user to record or store their data in this submit form. Then, i turned it into the table so that they can see through their for easier access. 

# Accesssibility notes: 



# How to run the app and tests: 
- Open the through live Server
- use the tests/test.html to test for any thing you want to tests in terms of regex and other tests.

## AI Disclosure, 
In line with the previous assignment brief/description, which allowed me to use some for documantation and seed data, i used AI and that is why my percent is a little higher for first part of my project on codePause. I just want the teacher to know that this is was before the assignment was updated. 
files containing AI: Seed data, .gitmore README.md Skeleton, and the spec. which in the the previous assignment it said, we were allowed to use AI for that and that is why the CodePause is howing a lot of AI for that day that has above 80. 




//still working on this read file as well.
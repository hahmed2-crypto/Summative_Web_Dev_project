# Student Finance Tracker 
# Links
1. Live URL: https://hahmed2-crypto.github.io/Summative_Web_Dev_project/
2. Video Link:  (to be recorded soon)


## Overview
This is a website that is for students who want manage their finance resposibly. It allows them to monitor, add see thier spending on the dashboard. it allows them to see their weekly spending. IT allows them also budget for monthly budgiting.(I am still working on the Dashboard and what it shows) 
## Features

- Transaction add button - allows the user to add their spending item(description), with date,money and what type of category it is.(Inprogress)
- Currency Conversion - it allows the user to manually convert the amount which has base transfer currency of RWF to either naira, usd or kenyan shilling.(Inprogress)
- Categories - this feature is a feaure that allows the user to add new category if they feel like they need new category(Inprogress)
- Export and Import Data- this feature allows the user to upload or download data(Export function(Inprogress), import function (Inprogress))
- Records - records comes with search button that allows the user to search through their data and another select area where they can sort the data by date from oldest to newest, amount from high to low, and description with A-Z.

- Record Table Feature - It is a table that allows the user to see the recorded data which will be deplayed as Date, Description, Category, Amount(RWF) Actions


# Regex Catalog:
| **Field** | **Pattern** | **Checks** | **Passes** | **Fails** | **Why I chose this**|
|---|---|---|---|---|---|
|Description | ^\S(?:.*\)?$ | No leading or trailing space | `Lunch` | `" Lunch"` | I used this regex to eleminate any of leadig or trailing spaces that the user my use in their decription since that is real human errors |
|Date | `"^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$"` | YYYY-MM-DD shape(plus UTC real calender check in code) | 2024-02-29 | 2026-02-30 |  I wrote the regex so it gets rid-off any other numbers that are not in this year form type so that we can check with real UTC calender  |
|Amount | `^([1-9]\d*)(\.\d{1,2})?$` | Digits, no leading zeros, up to 2 decimals | `12.50 | `012`, `12.345` | this regex pattern makes sure that numbers are real numbers, and not containing any zeros infront |
|Category | `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` | letters, single spaces, hyphens | `Health-Care` | `Food2` | for category, i believe i only need for the categories to contain letters, hyphens, and a single space, wich this regex allows me to do so  |
|Duplicate words | `\b(\w+)\s+\1\b` (it is for case-insensitive) | repeated word(back-reference)| | |this regex makes sure that in all of the code that there is no repeating same work |
# Justifications for Tested Items:
- Tab key: It works and makes to move to defferent sections and forms, also scrolls up or moves upward as well.
- space key: also works and it jumps down by sections as well
- Enter Key: doesn't work yet
- Tab + shift key: doesn't work yet.
- form submit: I allowed the user to record or store their data in this submit form. Then, i turned it into the table so that they can see through their for easier access. 

# Accesssibility notes: 
What I built so far:
Responsive App with Dashboard placholder, About me seciton, Add section for adding transactions, settings transaction manual conversations, 
category which allows the user to add a category, export and import data sections that are not fully functional right now, Records section where it has search input form that allows the user to search with case-insensitivity in mine, also there is sort by function, which the user can chose to origanize the data how they would like to sort their data, and finally i built the list of all recorded transactions that the user can see in the app. 


# How to run the app and tests: 
- Open the through live Server
- use the tests/test.html to test for any thing you want to tests in terms of regex and other tests.

## AI Disclosure, 
In line with the previous assignment brief/description, which allowed me to use some for documantation and seed data, i used AI and that is why my percent is a little higher for first part of my project on codePause. I just want the teacher to know that this is was before the assignment was updated. 
files containing AI: Seed data, .gitmore README.md Skeleton, and the spec. which in the the previous assignment it said, we were allowed to use AI for that and that is why the CodePause is howing a lot of AI for that day that has above 80. 




//still working on this read file as well.
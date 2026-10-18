# Student Finance Tracker 
## Links
1. Live URL: https://hahmed2-crypto.github.io/Summative_Web_Dev_project/
2. [Video walkthrough coming soon](PLACEHOLDER_LINK)


## Overview

This is a website that I made for for students who want manage daily their money resposibly. It allows them see their spending, total metric on live dashboard, set budget cap in Rwandan France, and manage everything in one clean page.

## Features

- ** Add Transaction - allows the user to add their spending item(description), with date,money and what type of category it is.(Inprogress)
- Currency Conversion - it allows the user to manually convert the amount which has base transfer currency of RWF to either naira, usd or kenyan shilling.(Inprogress)
- Categories - this feature is a feaure that allows the user to add new category if they feel like they need new category(Inprogress)
- Export: Let's the user download their records
Import Data- It allows the user to upload json files only
- Records - records comes with search button that allows the user to search through their data and another select area where they can sort the data by date from oldest to newest, amount from high to low, and description with A-Z(Inprogress).

- Record Table Feature - It is a table that allows the user to see the recorded data which will be deplayed as Date, Description, Category, Amount(RWF) Actions
- Responsive App with Dashboard placholder, About me seciton, Add section for adding transactions, settings transaction manual conversations, 
category which allows the user to add a category, export and import data sections that are not fully functional right now, Records section where it has search input form that allows the user to search with case-insensitivity in mine, also there is sort by function, which the user can chose to origanize the data how they would like to sort their data, and finally i built the list of all recorded transactions that the user can see in the app.
- Easy Row Deletation: Every transaction row has a delete button so that user can erase that row if they not like it or want edit it in the add transation area. 


## Regex Catalog:

| **Field** | **Pattern** | **Checks** | **Passes** | **Fails** | **Why I chose this**|
|---|---|---|---|---|---|
|Description | `^\S(?:.*\S)?$` | No leading or trailing space | `Lunch` | `" Lunch"` | I used this regex so it rejects entries that spaces either in the front or at then end/back of the description.  |
|Date | `^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$` | YYYY-MM-DD shape(plus UTC real calender check in code) | 2024-02-29 | 2026-02-30 |  I wrote the regex so it checks YYYY-MM-DD format shape, then confirms the day exists, so 2026-02-30 is rejected.|
|Amount | `^(0\|[1-9]\d*)(\.\d{1,2})?$` | Digits, no leading zeros, up to 2 decimals | `12.50` | `012`, `12.345` | this regex pattern makes sure that numbers are real numbers, and not containing any zeros infront except a lone zero |
|Category | `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` | letters, single spaces, hyphens | `Health-Care` | `Food2` | for category, i believe i only need for the categories to contain letters, hyphens, and a single space, wich this regex allows me to do so  |
|Duplicate words | `\b(\w+)\s+\1\b` (it is for case-insensitive) | repeated word(back-reference)|Tea tea | is island |this regex flags a repeated word in a description |

## Justifications for Tested Items:

- **Skip link:** After loading the page, and I pressed Tab once, It showed blue skip-link pops up and Enter moves focus to main content section so that we can move to the navigations. Skip-link does not stay stay on the screen after the first loading.
- **Tab key:** Tab moves focus from one control to the next. It jumps down to Add Transaction section
- **space key:** space scrolls through the page only when nothing is focused on.
- **Enter Key:** I tabbed to settings section and pressed Enter. No thing happened
- **Tab + shift key:** I tabbed forward to the about section and pressed Shift+Tab. And the focus moved back up to previous sections which is dashboard.
- **form submition:** when click on submit `e.preventDefualt()` to stop the page reload. if rule fails, it stops, paints the error message label, and forces the user focus onto the first broken box.


## Keyboard Map
| Key | Intended action | Works on the live site? |
|---|---|---|
| **Tab** | Move focus to the next control (skip link first after reload) | **Yes** |
|**Shift+Tab** | Move focus to the previous control | **Yes** |
| **Enter** | Activate the focused link or button| **Yes** |
| **Space** | Press a focused button; scroll when nothing is focused on| **Yes** |



## Accesssibility notes:

- **Landmarks:** I used tage like `<header`, `<nav>`, `<main>`, `<section>` and `<footer>` so assistive programs can map the page layout easily.
- **Headings:** My page flows from one main `<h1>` title down into standard`<h2>` sub-sections.
- **Labels:** Every single text input field and selection dropdown box is connected directly to a `<label>` tag using matching `id` and `for` attributes.
- **Focus Outlines:** Visible focus rings are fully active so keyboard-onlly users can clearly see what box is currently highlighted.
- **Screen Reader Alerts:** Error text logs are attached to their input boxes via `aria-describedby`. Live dashboard metrics changes use `aria-live` fields so screen readers read budget warnings out loud automatically


## How to run the app and tests:
- Download or clone this workspace folder to your computer. 
- Open the directory using a web server like live Server(e.g VS code Live Server extension) so that Javascript module(`type="module"`) files load without browser blocks.
- use the tests/tests.html for testing  the automated script and verify that all regex validations pass.

## AI Disclosure, 
In line with the previous assignment brief/description, which allowed me to use some for documantation and seed data, i used Claudi AI and that is why my percent is a little higher for first part of my project on codePause. I just want the teacher to know that this is was before the assignment was updated. 
files containing AI: Seed data, .gitmore README.md Skeleton, and the spec. which in the the previous assignment it said, we were allowed to use AI for that and that is why the CodePause is showing a lot of AI for that day that has above 80(on the day files were add 88% AI because at the time i was allowed, but my overall or avarage is 15% AI usage across the week) . I was not sure if i removed the files, it will change anything so i kept it. 





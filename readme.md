# VLEAD Website Project Documentation

## VLEAD Web

## Overview

The aim of the project is to create a website for the Virtual Labs Engineering and Architecture Division (VLEAD). The website is intended to be rich, easy-to-use, and intuitive. Mobile usage is also a priority for the website, in that it should be responsive and content/functionality should not be compromised on smaller screens.

The website was built using [Astro](https://github.com/withastro/astro).

## Target Audience

We expect and provide for 3 kinds of users:
1. **Learners:** Learners should be able to use the website to effectively explore experiments and begin their learning process. The website should be equally intuitive for both first-time and returning users. They can browse, search, and filter experiments (by discipline and lab). 
2. **Educators:** Would be using the website to access the experiments but also for other purposes. Outreach pages with relevant documentation have been added to that end. 
3. **Creators:** The website has sections to guide experiment creators through the process of creation and hosting.  

In addition to these proto-users, we also have some sections which are common to all of them and also to the casual visitor e.g. Analytics, Research, FAQs.

## Technology Used

The main framework is Astro. A sizeable portion of our project was to analyze and compare frameworks to arrive at the best one keeping in mind the requirements. To this end, we tested [Astro](https://astro.build/), [NextJS](https://github.com/vercel/next.js), and [Docusaurus](https://github.com/facebook/docusaurus). The framework comparison document can be seen [here](https://iiitaphyd-my.sharepoint.com/:w:/g/personal/shambhavi_jahagirdar_research_iiit_ac_in/EcErRHvq5KVBh-avesZpigUBehz83adNFtw_O2fREY6Gkg?rtime=K3SIvP1C20g), and the Astro segment can be found in the Appendix. Our priorities were that the framework be reasonably supported and easy to pick up for new users, so that future maintainers could quickly start working on the codebase without significant learning curves. 

The project is built on [node.js](https://nodejs.org/en) and uses [React](https://github.com/facebook/react) components in places. This utilizes a feature called [Astro Islands](https://docs.astro.build/en/concepts/islands/), whereby components written in *any* library can be imported into an astro filed and used directly. Hence, we leave future maintainers the option of modifying code and using a different library without having to refactor the entire codebase. 

For convenient CSS, we have used [Bulma](https://github.com/jgthms/bulma). 

A full list of the major libraries used in the project can be found in the Appendix.
<!-- [TODO: ADD LIST TO APPENDIX] -->

## Overall Architecture

**The homepage** is organized so as to provide the website visitor with the choice of 3 roles. Until a role is chosen, the user will be able to see a link to the Analytics page and Our Team page on the navbar, and 2 other sections on the page -- **Domains** and **Support**. 
*Domains* is a carousel of the various domains covered by Virtual Labs experiments e.g. Computer Science, Biotechnology, etc. Clicking on any of them takes the user to the experiments page with the discipline filter applied. *Services* contains 4 parts -- *Development and Hosting*, *Research*, *Outreach* & *Virtual Box*. Clicking on these takes you to the relevant pages.
The 'choose role' side of things is important. On choosing one of *Learner*, *Educator*, or *Creator*, we set a Session Storage variable with the the corresponding value. Links relevant to each role appear in the navbar. Currently this entails
* Learner &#8594; Start Learning
* Educator &#8594; Outreach
* Creator &#8594; Create Experiment

* **Future Work:**
In the future, the client team may want to add more features based on what the Session Storage value is. 

**The Analytics page** contains 4 graphs, based on data fetched from 4 different spreadsheets. Below that we have an iframe showing detailed data.

**The Create Experiment page** can be accessed through the Support section on Homepage. In *Creator* mode, a hyperlink on the navbar also links user to this page. This page contains the required documentation for creating (development) and hosting an experiment. Each doc has the corresponding Table of Contents for easier navigation.

**The FAQ page** can be accessed through the Support section on Homepage. It has some frequently asked questions related to virtual labs. Each question answer pair is collapsible, i.e, opens on clicking.

**The Our Team page** can be accessed through the navbar. It contains the profiles and testimonials of all VLEAD employees and student associates - interns, RAs, etc.

**The Research page** can be accessed through the Support section on Homepage. As of now it does not contain any data, but simply a research.astro file can be created if required.

**The Outreach page** can be accessed through the Support section on Homepage. In *Educator* mode, a hyperlink on the navbar also links user to this page. This page contains the required documentation for conducting a workshop, FAQs regarding worshops, stats about the previously conducted worshops and information about nodal centers.

**The experiments page** was made by other team, which we just integrated in our website. It can be accessed by clicking on a particular domain which will filter experiments for that domain. In *Learner* mode, a hyperlink on the navbar also links user to this page. 

**The 404 page** is created so that if user by chance navigates to a non-existing page, he will be able to experience a random experiment.



<!-- [TODO: Add other pages] -->

## Code Explanation
Each file in the code is either a page,a layout or a componenent that is imported into a file, with the exception of the files that perform caching. There is no main file and each 'page' is its own path. 

The *Components* folder contains components exported to pages to be displayed.
- Navbar 
- Footer
- Card (on home page, for domains and support)
- Load (to display loading when required)
- Typewrite (homepage UI feature)
- OrderTable (display experiments, and set search filter results)
- Toc (for generating table of contents on documentation pages)
    -- Recognising headings from the markdown content
    -- Display in a list
- Faq (rendering faqs as a component to include its UI)
    -- Fetched list of all qna from github
    -- Separated into questions and answers
    -- Made the answers collapsible
- Devcontent (fetch and display markdown content from github for documentation pages)
- Fetch (fetch api calls to google sheets)
- Vbox fetch (fetch api call and display virtual box doc)
- Chart
    -- Converted data fetched from google sheets (fetch.jsx) into charts

The *Layouts* folder has one file, Base.astro which defines the basic page layout followed through the website. It includes Navbar and Footer components (imported from components folder).

In the *Pages* folder, each file is rendered as a page with the file name as part of url. Each page contains required components imported from *Components* folder. The pages are enclosed in the layout *Base*.

- *Index-page* -: (url: /) Home page for the website. Introduction writeup present in two columns. *Typewriter-effect* library has been used for the typewriter effect. The page has three roles to choose from, with descriptions mentioned. The roles can be added/modified from home_data.json file present in src folder.  
    Similarly, domains details list and services details list can be modified in home_data.json.  
    Swiper-library has been used for sliding view of the cards. Its attributes can be changed from the arguments passed to <swiper-container /> The library has been imported using cdn : https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css
- *Members-page* -: To navigate here, use the Our Team option on the navbar. This page has the profiles of all members of the VLEAD, Vlabs Team. The cards are an external component imported from "yatharth-super-lemon" in components/people_card.jsx. The team member details is fetched from the sheet api: https://script.google.com/macros/s/AKfycbyvD_OVuhxgdgxTxoFMV4Jes40VtmH4SWRradzivUhknlPr-BepBeGp1IzrPcd9G-CftA/exec  
    For fetching current team members list, add "?q=current" to the end of the url. For past members, add "?q=past". 
    The testimonial details are fetched from the sheet api: https://script.google.com/macros/s/AKfycbzvYgAwebXfLnmcN0PJmK9AqApj_eeCOqL_J-s25nCkhV-5QKXrxOTUMjHJCSnJTSlu/exec
    The api will fetch 4 random testimonials from the sheet. 
    The fetch has been performed in people_card.jsx. The details fetched for each member entry in the sheet are passed as parameters to <People_Card/>. The image drive link url is received as a google drive link input and is converted to api format in convert_url function.
    For any modifications or queries regarding the fetched data, please refer to the README provided in the latest version of the Team Details VLEAD google sheet.
    The testimonials are rendered through testimonials.jsx component. The quotes symbols for testimonials have been taken from fontawesome library, imported in components/testimonials.jsx - faQuoteLeft, faQuoteRight. 


- *Analytics-page* -: All the data for the institutes (iframe, name, img) is imported through src/analytics_data.json. All the charts are imported from "charts.jsx" present in *components*. Under the 'Base' layout first all the charts are displayed, then an iframe is displayed parallely with all the institutes image in desktop screen which changes to a dropdown in mobile screen.
- *Experiment's-page* -: This page is just integrated in our website, all the experiments which are currently on amazon AWS can be searched on this page. A search option is always available in navbar which is exaclty same as the search on experiment page. Experiments can be filtered according to lab and domain. This page imports 'Search_filerts' component. In this component all the experiments are fetched and displayed using MUI and another component 'OrderTable'. Here all the search filter and pagination is implemented according to user input. Each experiment is displayed as a card component 'ExperimentCard'. Here MUI card properties are used for responsive design.
- *Outreach-page* -: Images for gallery are stored in public/outreach-images. The images are also present in github repo - virtual-labs/outreach-web-pages-iiith/photographs.
    
    Workshop analytics and nodal centres analytics displayed in the form of iframe fetched from lookerstudio. The list of urls is present in src/outreach.json. 
    FAQs are fetched from github using API, hence have an API limit of 5000 - https://github.com/virtual-labs/outreach-web-pages-iiith/tree/main/faq.
    Request a workshop document is fetched as a github readme rawcontent - https://github.com/virtual-labs/outreach-web-pages-iiith/blob/main/workshop-process/workshop-process.md
    
    To add any tab to the page, changes have to be made to the code.
    
- *DevDocs-page* -: This page displays all documentation regarding experiment development and hosting. The documents are fetched as raw github content from github markdown files. The list of files and their urls can be viewed and changed/added in src/devprocess_docs.json.
    The contents for each document are generated by identifying headings in each document.
    The Create Experiment button takes us to the cms page.
    

The *css* folder contains stylesheets. All the css files are present in this folder. Each css file handles the styling of its corresponding page or component.

The *public* folder contains the images for the website. 

## Image rendering

To enable seamless page growth without requiring developers to add images, you can store image URLs in a JSON file. Note that images hosted on Google Drive cannot be used directly in HTML tags for rendering.

A suitable alternative is using a service like Imgur. Steps to follow are:

Sign up or log in to Imgur.
Upload your images and set them to "hidden" for privacy (it will be set to hidden by default).
Navigate to your images in your Imgur account.
Click on the desired image to view its details.
Copy the direct link provided (one of the six available links).
Finally, include this direct link in the JSON file where you want the image to appear.

## Future Work
1. In the Our Team page, for each profile card, add a button in the modal that will copy the profile's shareable link to the clipboard.
2. In Outreach page Gallery, enlarge images upon click. Fetch the images from the github repo mentioned above at build time. So everytime a new image is added, the website has to be built again. Do this for other github content wherver API limit is causing issues.
3. In Outreach page, make the list of tabs into an editable json file and import it into the webpage code so that the list can be edited easily without effecting the code.
4. Currently the implementation of colour themes is as follows - default is the light mode, and a dark class is defined for every element that changes colour in dark mode. So upon clicking on dark mode, the dark class is added. There is a single theme.css that has both tones defined for every colour. But only two themes can be implemented this way. Condsider implementing a multi-theme extensible system and create a theme.css for each theme, and only change the theme.css file in effect when the theme is changed.
5. In the Our Team page, make the testimonials and the remaining page scroll separately so that the testimonials section does not show an empty place when too many cards are there.
6. In all pages, background is applied as a circular gradient. Instead, make the gradient section wise. Refer to astro homepage for reference of the idea.
7. Add analytics iframes for other data as well.
8. Fetch all the md docs (mainly faqs due to rate limit) at the build time using some astro pulgin. 
    
## Troubleshooting
1. If any member card does not show up in the Our Team page, please check the latest Team Member Details sheet. Make sure that all entries are filled, and there are no stray cells filled anywhere.
2. On slow network, raw github content may not work, i.e., documents might not be displayed.
3. FAQs will not load if rate limit api is reached which is 60/hr.
## Appendix

1. Astro framework analysis ![](https://i.imgur.com/C3r8osR.png)
2. Libraries used
* bulma
* swiperJS
* AOS(animate on scroll)
* recharts
* remark and rehpye (for markdown files)
* fuse.js
* mui (used on experiments page by other team)
* typewriter-effect
* font-awesome

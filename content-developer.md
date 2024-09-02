# Content Developer Documentation

## Development Process

1. **Setting Up the Development Environment**
   - Clone the repository: `git clone <repository-url>`
   - Navigate to the project directory: `cd vlead-web`
   - Install dependencies: `npm install`

2. **Development Workflow**
   - Create a new branch for your feature: `git checkout -b feature-branch`
   - Make your changes and commit: `git commit -m "Description of changes"`
   - Push your branch: `git push origin feature-branch`
   - Create a pull request and wait for review

3. **Testing**
   - Run unit tests: `npm test`
   - Run integration tests: `npm run test:integration`
   - Ensure all tests pass before creating a pull request

## Deploying the Web-App

There are two levels of deployment that happen when a developer wishes to deploy:
- Once pushed to the testing branch, the deployment-testing.yml workflow in the `.github/workflows` folder deploys the web app onto [testing site](https://virtual-labs.github.io/app-vlead-web/).
- Once a release is published, the deployment-release.yml workflow in the `.github/workflows` folder deploys the web app onto [production site](https://vlead.vlabs.ac.in/).

## Troubleshooting

1. **Missing Member Card**
   - If any member card does not show up in the Our Team page, please check the latest Team Member Details sheet. Make sure that all entries are filled, and there are no stray cells filled anywhere.

2. **Slow Network Issues**
   - On a slow network, raw GitHub content may not work, i.e., documents might not be displayed.

3. **FAQ Load Issues**
   - FAQs will not load if the rate limit API is reached which is 60/hr.

## Code Explanation

Each file in the code is either a page, a layout, or a component that is imported into a file, with the exception of the files that perform caching. There is no main file and each 'page' is its own path. 

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
- *VLEAD PAGE* -: To navigate here, use the About option on the navbar. This page has the profiles of all members of the VLEAD, Vlabs Team. The cards are an external component imported from "yatharth-super-lemon" in components/people_card.jsx. The team member details is fetched from the sheet api: https://script.google.com/macros/s/AKfycbyGnquiCXAdpFSJaJo2mJDB5wDfRPh_p67L98FzCaYboOWzsMYYLiJ0vpeh9FP0nrdMXw/exec
https://script.google.com/macros/s/
For fetching current team members list, add "?q=people&status=current" to the end of the url. For past members, add "?q=people&status=past". For testimonials, add "?q=testimonials".
The testimonials API by default loads 8 random testimonials. In case a specific number of testimonials must be fetched, append "&count=x" to the end of the url, where x us the number of testimonials one wishes to fetch.
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

In order to render images on Google drive, the image needs to be made public for anyone to view. The link generated will hae the following structure:
https://drive.google.com/file/d/0B6wwyazyzml-OGQ3VUo0Z2thdmc/view?usp=sharing
If the link is converted to have structure as follows:
https://drive.google.com/thumbnail?id=0B6wwyazyzml-OGQ3VUo0Z2thdmc, a browser will be capable of rendering the image. This is what has been used for rendering images for people cards in the VLEAD about page.

## Future Work

1. In the Our Team page, for each profile card, add a button in the modal that will copy the profile's shareable link to the clipboard.
2. In Outreach page Gallery, enlarge images upon click. Fetch the images from the github repo mentioned above at build time. So everytime a new image is added, the website has to be built again. Do this for other github content wherver API limit is causing issues.
3. In Outreach page, make the list of tabs into an editable json file and import it into the webpage code so that the list can be edited easily without affecting the code.
4. Currently the implementation of colour themes is as follows - default is the light mode, and a dark class is defined for every element that changes colour in dark mode. So upon clicking on dark mode, the dark class is added. There is a single theme.css that has both tones defined for every colour. But only two themes can be implemented this way. Condsider implementing a multi-theme extensible system and create a theme.css for each theme, and only change the theme.css file in effect when the theme is changed.
5. In all pages, background is applied as a circular gradient. Instead, make the gradient section wise. Refer to astro homepage for reference of the idea. (done)
6. Add analytics iframes for other data as well. (done)
7. Fetch all the md docs (mainly faqs due to rate limit) at the build time using some astro pulgin. 
8. Add the images to CDN (from the links and files in the repository) and use that to display all the images. Currently, the images are there in the links in the json files.
9. The script linked to the spreadsheet used to display the labs on the homepage can be made to have a cache system - where it refreshed every few hours or so.
10. Make the options for gallery and faqs sticky for the outreach page.

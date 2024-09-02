# Content Editor Documentation

## Content Management

For making changes to the content of the website, the following JSON files are used:

- `about-data.json`: Contains content for the VLEAD and Virtual Labs about pages
- `analytics_data.json`: Contains content for the analytics pages
- `devprocess_docs.json`: Contains content for the create experiment page
- `footer_data.json`: Contains content for the footer of the web-app
- `home_data.json`: Contains content for the home page of the web-app
- `navbar.json`: Contains all data for the dropdowns in the navbar
- `outreach.json`: Contains data for workshops and nodal centers on the outreach page
- `research_docs.json`: Contains data for the explore research page

## Adding and Modifying Content

1. **About Page**
   - Modify `about-data.json` to update the content for the VLEAD and Virtual Labs about pages.

2. **Analytics Page**
   - Update `analytics_data.json` with the latest analytics content.

3. **Create Experiment Page**
   - Edit `devprocess_docs.json` to update the content guiding experiment creation.

4. **Footer**
   - Update `footer_data.json` for modifying footer content.

5. **Home Page**
   - Modify `home_data.json` for updating the home page content.

6. **Navbar**
   - Update `navbar.json` to modify the dropdowns in the navbar.

7. **Outreach Page**
   - Edit `outreach.json` for updating information about workshops and nodal centers.

8. **Research Page**
   - Modify `research_docs.json` to update the content for the research page.

## Content Update Workflow

1. **Fetch Latest Data**
   - Pull the latest changes from the repository: `git pull origin main`

2. **Edit JSON Files**
   - Make necessary changes to the JSON files as per the guidelines.

3. **Commit and Push Changes**
   - Commit your changes: `git commit -m "Updated content for <page>"`
   - Push changes: `git push origin main`

4. **Verify Changes**
   - Ensure that the changes are reflected correctly on the testing site before deploying to production.

## Troubleshooting

1. **Content Not Updating**
   - Ensure the JSON file is correctly formatted and there are no syntax errors.
   - Verify that the changes have been pushed to the correct branch.

2. **Images Not Displaying**
   - Check the image URLs in the JSON files and ensure they are correct and accessible.

3. **Incorrect Links**
   - Verify that all links in the content are correct and lead to the intended pages.

---
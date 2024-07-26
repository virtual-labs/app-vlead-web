# Content Adder Documentation

## Adding New Content

1. **Markdown Content**
   - Create a new Markdown file in the appropriate directory.
   - Ensure the file follows the required structure and formatting guidelines.
   - Add the new file's path to the relevant JSON file for automatic fetching and rendering.

2. **Images**
   - Upload the image to the appropriate directory in the `public` folder.
   - Ensure the image is publicly accessible and follows the naming conventions.

3. **JSON Files**
   - Update the relevant JSON file with the new content.
   - Ensure the JSON structure is maintained and properly formatted.

## Updating Existing Content

1. **Markdown Content**
   - Locate the existing Markdown file.
   - Make the necessary changes.
   - Save and commit the changes.

2. **Images**
   - Replace the old image with the new one in the `public` folder.
   - Ensure the image link in the JSON or Markdown file is updated accordingly.

3. **JSON Files**
   - Locate the relevant JSON file.
   - Make the necessary updates.
   - Ensure the JSON structure is maintained and properly formatted.

## Troubleshooting

1. **Content Not Displaying**
   - Ensure the file path is correct in the relevant JSON file.
   - Check for any syntax errors in the Markdown or JSON file.
   - Verify the image link is correct and publicly accessible.

2. **API Rate Limits**
   - If FAQs or other content are not loading, it might be due to API rate limits. Wait for the limit to reset or consider fetching the content at build time.

## Adding Roles

- Modify the `home_data.json` file to add or update roles on the homepage.
- Ensure the new roles have corresponding sections and content available.


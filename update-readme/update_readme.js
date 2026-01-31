const fs = require('fs');
const path = require('path');

// Paths to the files
const rawReadmePath = path.join(__dirname, 'RAW_README.md');
const scriptPath = path.join(__dirname, '../script/fetch_yearly_data.js');
const outputReadmePath = path.join(__dirname, '../README.md');

// Read the RAW_README.md file
fs.readFile(rawReadmePath, 'utf8', (err, rawReadmeContent) => {
    if (err) {
        console.error('Error reading RAW_README.md:', err);
        process.exit(1);
    }

    // Read the script file
    fs.readFile(scriptPath, 'utf8', (err, scriptContent) => {
        if (err) {
            console.error('Error reading fetch_yearly_data.js:', err);
            process.exit(1);
        }

        // Replace {{inject_script}} with the script content
        const updatedReadmeContent = rawReadmeContent.replace('{{inject_script}}', scriptContent);

        // Write the updated content to README.md
        fs.writeFile(outputReadmePath, updatedReadmeContent, 'utf8', (err) => {
            if (err) {
                console.error('Error writing README.md:', err);
                process.exit(1);
            }
            console.log('README.md has been updated successfully.');
        });
    });
});
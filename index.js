const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your repo/app?"
        },
        {
            type: "input",
            name: "description",
            message: "Please add a description: "
        },
        {
            type: "input",
            name: "installation",
            message: "Enter Installation instructions: ",
        },
        {
            type: "input",
            name: "usage",
            message: "Enter insturction on how to use your application: "
        },
        {
            type: "input",
            name: "contributing",
            message: "Enter contributing guidelines: "
        },
        {
            type: "input",
            name: "test",
            message: "Enter test instructions: "
        },
        {
            type: "list",
            name: "license",
            message: "Select your license",
            choices: [
                "Academic Free License v3.0",
                "Apache license 2.0",
                "Artistic license 2.0",
                "Boost Software License 1.0",
                'BSD 2-clause "Simplified" license',
                'BSD 3-clause "New" or "Revised" license',
                'BSD 3-clause Clear license',
                'Creative Commons license family',
                'Creative Commons Zero v1.0 Universal',
                'Creative Commons Attribution 4.0',
                'Do What The F*ck You Want To Public License',
                'Educational Community License v2.0',
                'Eclipse Public License 1.0',
                'European Union Public License 1.1',
                'GNU Affero General Public License v3.0',
                'GNU General Public License family',
                'GNU General Public License v2.0',
                'GNU General Public License v3.0',
                'GNU Lesser General Public License family',
                'GNU Lesser General Public License v2.1',
                'GNU Lesser General Public License v3.0',
                'ISC',
                'LaTeX Project Public License v1.3c',
                'Microsoft Public License',
                'MIT',
                'Mozilla Public License 2.0',
                'Open Software License 3.0',
                'PostgreSQL License',
                'SIL Open Font License 1.1',
                'University of Illinois/NCSA Open Source License',
                'The Unlicense',
                'zLib License'
            ]
        },
        {
            type: "input",
            name: "github",
            message: "Enter yout GitHub username: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter yout email address: "
        },
    ]);
}

const readmeText = (answers) => {
    return`
# ${answers.title}

${answers.description}
    
# Table of Contents
    
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Test](#test)
5. [Questions](#questions)
6. [License](#license)
    
## Installation
${answers.installation}
## Usage
${answers.usage}
## Contributing
${answers.contributing}
## Test
${answers.test}
## Questions
${answers.questions}
## License
[${answers.license}](https://choosealicense.com/licenses/mit/)`
}




promptUser()
    .then(function(answers) {
        const readme = readmeText(answers);
        return writeFileAsync("README.md", readme);
    })
    .catch(function(err) {
        console.log(err);
      });
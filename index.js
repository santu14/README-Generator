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
                "Apache license 2.0",
                "Artistic license 2.0",
                "Boost Software License 1.0",
                'BSD 2-clause "Simplified" license',
                'BSD 3-clause license',
                'Creative Commons Zero v1.0 Universal',
                'Creative Commons Attribution 4.0',
                'Do What The F*ck You Want To Public License',
                'Eclipse Public License 1.0',
                'GNU Affero General Public License v3.0',
                'GNU General Public License v2.0',
                'GNU General Public License v3.0',
                'GNU Lesser General Public License v3.0',
                'ISC',
                'MIT',
                'Mozilla Public License 2.0',
                'SIL Open Font License 1.1',
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
const selectedLicence = (answers) => {
    switch(answers.license){
        case 'Apache license 2.0':
            return '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
        case 'Artistic license 2.0':
            return '[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)';
        case 'Boost Software License 1.0':
            return '[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
        case 'BSD 2-clause "Simplified" license':
            return '[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)';
        case 'BSD 3-clause license':
            return '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
        case 'Creative Commons Zero v1.0 Universal':
            return '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)';
        case 'Creative Commons Attribution 4.0':
            return '[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)';
        case 'Do What The F*ck You Want To Public License':
            return '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)';
        case 'Eclipse Public License 1.0':
            return '[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)';
        case 'GNU Affero General Public License v3.0':
            return '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)';
        case 'GNU General Public License v2.0':
            return '[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)';
        case 'GNU General Public License v3.0':
            return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
        case 'GNU Lesser General Public License v3.0':
            return '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)';
        case 'ISC':
            return '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
        case 'MIT':
            return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
        case 'Mozilla Public License 2.0':
            return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
        case 'SIL Open Font License 1.1':
            return '[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL%201.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)';
        case 'The Unlicense':
            return '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
        case 'zLib License':
            return '[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)';

    }
}
const readmeText = (answers) => {
    return`
# ${answers.title}     ${selectedLicence(answers)}

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
[${answers.license}](https://choosealicense.com/licenses/mit/)
`
}




promptUser()
    .then(function(answers) {
        const readme = readmeText(answers);
        return writeFileAsync("README.md", readme);
    })
    .catch(function(err) {
        console.log(err);
      });
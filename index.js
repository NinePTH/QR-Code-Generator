import inquirer from 'inquirer';
import * as fs from 'fs';
import qr from 'qr-image';

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        name: 'websiteLink',
        message: 'What is the website link?',
        default: 'www.google.com'
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.info('Saved answer:', answers.websiteLink);
    fs.writeFile('message.txt', answers.websiteLink, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
    var qr_svg = qr.image(answers.websiteLink, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));
  })

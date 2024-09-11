import inquirer from 'inquirer'; // use when you want to try to generate qr in the terminal (Uncomment the line below those app.whateverFunction)
import * as fs from 'fs';
import qr from 'qr-image';

import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));

function logger(req, res ,next) {
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);
  next();
}

app.use(logger)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.post('/make_qr', (req, res) => {
  console.log("Request URL for QR",req.body.url)
  fs.writeFile('message.txt', req.body.url, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
  const qr_svg = qr.image(req.body.url, { type: 'png' });
  const output = fs.createWriteStream('qr_code.png');

  qr_svg.pipe(output);

  output.on("finish", () => {
    res.sendFile(__dirname + '/qr_code.png');
  })
})

// inquirer
//   .prompt([
//     // Declare the question and default value
//     {
//         name: 'websiteLink',
//         message: 'What is the website link?',
//         default: 'www.google.com'
//     },
//   ])
//   .then((answers) => {
//     // Create url of the website from user's input
//     console.info('Saved answer:', answers.websiteLink);
//     fs.writeFile('message.txt', answers.websiteLink, (err) => {
//         if (err) throw err;
//         console.log('The file has been saved!');
//     })
//     var qr_svg = qr.image(answers.websiteLink, { type: 'png' });
//     qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));
//   })

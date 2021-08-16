import express from 'express';
import cors from 'cors';
import routes from './routes';
import './database';

const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const puppeteer = require('puppeteer');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static('public'));

// app.get('/pdfview', async (request, response) => {
//   const filePath = path.join(__dirname, 'print.ejs');
//   ejs.renderFile(
//     filePath,
//     { passengers },
//     // eslint-disable-next-line consistent-return
//     async (err: Error, html: HTMLDocument): Promise<any> => {
//       if (err) {
//         return response.send('Erro ao gerar o PDF');
//       }

//       const options = {
//         height: '11.24in',
//         with: '8.51in',
//         header: {
//           height: '20mm',
//         },
//         footer: {
//           height: '20mm',
//         },
//       };

//       pdf
//         .create(html, options)
//         .toFile('report.pdf', (error: Error, data: any) => {
//           if (error) {
//             return response.send('Erro ao gerar o PDF');
//           }

//           return response.send('arquivo gerado co suceso');
//         });
//     },
//   );
// });

// app.get('/generate', (request, response) => {
//   const filePath = path.join(__dirname, 'print.ejs');
//   ejs.renderFile(
//     filePath,
//     { passengers },
//     function (err: Error, str: HTMLDocument) {
//       if (err) {
//         return response.send('Erro ao gerar o PDF');
//       }
//       return response.send(str);
//     },
//   );
// });

// app.get('/pdf', async (request, response) => {
//   // const filePath = path.join(__dirname, 'print.ejs');
//   // ejs.renderFile(
//   //   filePath,
//   //   { passengers },
//   //   function (err: Error, str: HTMLDocument) {
//   //     if (err) {
//   //       return response.send('Erro ao gerar o PDF');
//   //     }
//   //     return response.send(str);
//   //   },
//   // );
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto('http://localhost:3333/generate', {
//       waitUntil: 'networkidle0',
//     });

//     // eslint-disable-next-line no-shadow
//     const pdf = await page.pdf({
//       printBackground: true,
//       format: 'Letter',
//     });

//     await browser.close();

//     response.contentType('application/pdf');

//     return response.send(pdf);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

import { parseSpreadsheet } from './parser';
// import { cleanData } from './cleaner';
import { formatDataForSearchIndex } from './formatter';
import { Retailer } from './models';

const filePath = 'iw-tech-test-retailer-data.xlsx';
const retailers: Retailer[] = parseSpreadsheet(filePath);
// const cleanedRetailers: Retailer[] = cleanData(retailers);
formatDataForSearchIndex(retailers);



// import * as fs from 'fs';
// const jsonString: string = JSON.stringify(retailers);

// const output: string = 'file-1.json';

// // Write the JSON string to the file
// fs.writeFileSync(output, jsonString, 'utf-8');

// console.log('JSON data has been dumped to', filePath);

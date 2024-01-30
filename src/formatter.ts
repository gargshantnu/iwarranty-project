import { Retailer } from './models';


export function formatDataForSearchIndex(retailers: Retailer[]): void {
    retailers.forEach((retailer) => {
        const sortedRetailer = sortKeys(retailer);

        const jsonLine = JSON.stringify(sortedRetailer);
        console.log(jsonLine);
    });
}


function sortKeys(obj: Record<string, any>): Record<string, any> {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(sortKeys);
    }

    const sorted: Record<string, any> = {};
    Object.keys(obj)
        .sort()
        .forEach((key) => {
            sorted[key] = sortKeys(obj[key]);
        });

    return sorted;
}

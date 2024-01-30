import * as xlsx from 'xlsx';
import { Retailer } from './models';

interface ColumnMapping {
  [key: string]: { path: string; transformer?: (value: any) => any };
}

const columnMapping: ColumnMapping = {
  'directory_category': { path: 'category', transformer: transformCategory },
  'content_children_count': { path: 'contentChildrenCount' },

  'directory_contact__fax': { path: 'contact.fax' },
  'directory_contact__mobile': { path: 'contact.mobile' },
  'directory_contact__email': { path: 'contact.email' },
  'directory_contact__phone': { path: 'contact.phone' },
  'directory_contact__website': { path: 'contact.website' },

  'content_post_id': { path: 'post.id' },
  'content_post_slug': { path: 'post.slug' },

  'content_body': { path: 'post.body' },

  'directory_location__street': { path: 'location.street' },
  'directory_location__city': { path: 'location.city' },
  'directory_location__country': { path: 'location.country' },
  'directory_location__address': { path: 'location.address' },
  'directory_location__lat': { path: 'location.lat' },
  'directory_location__lng': { path: 'location.lng' },
  'directory_location__zip': { path: 'location.zip' },
  'directory_location__state': { path: 'location.state' },

  'directory_social__facebook': { path: 'social.facebook' },
  'directory_social__googleplus': { path: 'social.googleplus' },
  'directory_social__twitter': { path: 'social.twitter' },

  'content_post_status': { path: 'post.status' },
  'content_post_title': { path: 'post.title' },
};

export function parseSpreadsheet(filePath: string): Retailer[] {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawData = xlsx.utils.sheet_to_json(sheet);

  const retailers: Retailer[] = rawData.map(parseRetailer);

  return retailers;
}

function parseRetailer(rawDataItem: any): Retailer {
  const retailer: Retailer = {} as Retailer;

  for (const [column, value] of Object.entries(rawDataItem)) {
    const mappedColumn = columnMapping[column];
    if (mappedColumn) {
      const { path, transformer } = mappedColumn;
      setNestedProperty(retailer, path, transformer ? transformer(value) : value);
    }
  }

  return retailer;
}

function setNestedProperty(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop() as string;

  let currentObj = obj;
  for (const key of keys) {
    currentObj[key] = currentObj[key] || {};
    currentObj = currentObj[key];
  }

  currentObj[lastKey] = value;
}


function transformCategory(value: any): string[] {
  return value.split(';').map((category: string) => category.trim());
}
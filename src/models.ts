interface Contact {
  email?: string;
  fax?: string;
  mobile?: string;
  phone?: string;
  website?: string;
};

interface Location {
  street?: string;
  city?: string;
  country?: string;
  address?: string;
  lat?: number;
  lng?: number;
  zip?: string;
  state?: string;
};

interface Social {
  facebook?: string;
  googleplus?: string;
  twitter?: string;
};

interface Post {
  id?: number;
  slug?: string;
  status?: string;
  title?: string;
  body?: string;
};


export interface Retailer {
  category: string[];
  contact: Contact;
  location: Location;
  social: Social;
  post: Post;
};

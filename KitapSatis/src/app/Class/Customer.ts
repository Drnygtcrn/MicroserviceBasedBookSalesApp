export class Customer {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    age?: string;
    __v?: number;
    address?: Address[];
    /*whislist?: WishlistItem[];*/
  }
  
  export class Address {
    _id?: string;
    street?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    check?:Boolean;
    
  }
  /*
  export class WishlistItem {
    proid?: string;
    name?: string;
    author?: string;
    publisher?: string;
    publication_year?: string;
    number_of_pages?: string;
    language?: string;
    price?: string;
    type?: string;
    _id?: string;
  }*/
  
export class Whislist {
    _id?: string;
    CustomerId?: string;
    Products?: Product[];
  }
  
  export class Product {
    proid?: string;
    name?: string;
    author?: string;
    publisher?: string;
    publication_year?: string;
    number_of_pages?: string;
    language?: string;
    price?: number;
    type?: string;
    img?: string;
  }
  
export class Basket {
    _id?: string;
    CustomerId?: string;
    Products?: Product[];
    total?: number;
  }
  
  export class Product {
    proid?: string;
    name?: string;
    author?: string;
    publisher?: string;
    publication_year?: string;
    number_of_pages?: string;
    language?: string;
    price?: string;
    type?: string;
    img?: string;
    quantity?:number;
  }
  
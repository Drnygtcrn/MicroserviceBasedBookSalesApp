export class Order {
    _id?: string;
    CustomerId?: string;
    Books?: Product[];
    status?:string;
    total?: number;
  }
  export class Product {
    proid?: string;
    name?: string;
    price?: number;
    quantity?:number;
  }
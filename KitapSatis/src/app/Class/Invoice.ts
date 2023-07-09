export class Invoice{
    Username?:string;
    Products?:[{
        name:string;
        quantity:number;
        price:number;
    }]
    Address?:{
        street:string;
        postalCode:string;
        city:string;
        country:string;
    }
    total?:number;
    
}
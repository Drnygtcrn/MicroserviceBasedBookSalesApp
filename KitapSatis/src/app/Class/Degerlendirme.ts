export class Degerlendirme {
    _id?: string;
    User?:{
        UserId: string,
        Username:string;
    };
    Book?:{
        proid?:string;
        name?:string;
        author?:string;
        publisher?:string;
        publication_year?:string;
        number_of_pages?:string;
        language?:string;
        price?:number;
        type?:string;
        img?:string;
    };
    rating?: number;
    comment?: string;
  }
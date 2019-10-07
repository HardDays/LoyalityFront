export class StoreModel{
    constructor(
        public id?:number,
        public name?:string,
        public company_id?:number,
        public created_at?:string,
        public updated_at?:string,
        public country?: string,
        public city?: string,
        public street?: string,
        public house?: string
    ){}
}
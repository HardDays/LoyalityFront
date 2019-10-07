export class CompanyModel{
    constructor(
        public id?:number,
        public legal_entity?:string,
        public postcode?:string,
        public inn?:string,
        public bic?:string,
        public bank?: string,
        public invoice?: string,
        public kpp?: string,
        public checking_account?: string,
        public phone?: string,
        public web_site?: string,
        public name?: string,
        public creator_id?: string,
        public created_at?: string,
        public updated_at?: string,
        public tariff_plan_purchase_id?: string
    ){}
}
export class OperatorModel{
    constructor(
        public id?: number,
        public email?: string,
        public created_at?: string,
        public updated_at?: string,
        public user_type?: string,
        public first_name?: string,
        public second_name?: string,
        public last_name?: string,
        public phone?: string,
        public operator_status?: string,
        public gender?: string,
        public birth_day?: string,
        public store_id?: number,
        public company_id?: number
    ){}
}
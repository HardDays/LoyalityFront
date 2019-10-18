export class ClientModel{
    constructor(
        public phone?:string,
        public first_name?:string,
        public last_name?:string,
        public second_name?:string,
        public gender?:string,
        public birth_day?:string,
        public loyalty_program_id?:number,
        public card_number?:string
    ){}
}

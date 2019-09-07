export class LoginSuccessModel{
    constructor(
        public first_name?:string,
        public last_name?:string,
        public email?:string,
        public password?:string,
        public phone?:string,
        public id?:string,
        public token?:string,
    ){}
}
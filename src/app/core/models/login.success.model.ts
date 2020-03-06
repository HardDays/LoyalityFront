import { ClientModel } from './client.model';
import { OperatorModel } from './operator.model';
import { CreatorModel } from './creator.model';

export class LoginSuccessModel
{
    constructor(
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public password?: string,
        public phone?: string,
        public id?: string,
        public token?: string,
        public user_type?: string,
        public birth_day?: string,
        public company_id?: string,
        public user_types?: string[],
        public client?: any[],
        public operator?: any[],
        public creator?: any[]
    ) { }
}

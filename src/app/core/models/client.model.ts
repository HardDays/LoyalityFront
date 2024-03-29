export class ClientModel {
  constructor(
    public id?: number,
    public phone?: string,
    public first_name?: string,
    public last_name?: string,
    public second_name?: string,
    public gender?: string,
    public birth_day?: string,
    public loyalty_program_id?: number,
    public card_number?: string,
    public points?: number,
    public recommendator_phone?: string,
    public email?: string,
    public loyalty_program?: any
  ) { }
}

export class ClientExtendedModel{
  constructor(
    public id?: number,
    public phone?: string,
    public first_name?: string,
    public last_name?: string,
    public second_name?: string,
    public full_name?: string,
    public gender?: string,
    public birth_day?: string,
    public loyalty_program_id?: number,
    public card_number?: string,
    public points?: number,
    public recommendator_phone?: string,
    public email?: string,
    public loyalty_program?: any
  ) { }
}

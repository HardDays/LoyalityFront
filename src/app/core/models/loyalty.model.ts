export class LoyaltyModel {
  constructor(
    public id?: number,
    public company_id?: number,
    public created_at?: string,
    public updated_at?: string,
    public name?: string,
    public sum_type = "one_buy",
    public rounding_rule = "no_rounding",
    public accrual_on_register = false,
    public accrual_on_first_buy = false,
    public accrual_on_recommend = false,
    public recommend_recommendator_points?: number,
    public recommend_registered_points?: number,
    public write_off_limited = false,
    public write_off_min_price?: number,
    public register_points?: number,
    public first_buy_points?: number,
    public sms_on_register = false,
    public sms_on_points = false,
    public sms_on_write_off = false,
    public sms_on_burning = false,
    public sms_burning_days?: number,
    public sms_on_birthday = false,
    public loyalty_levels?: LoyaltyLevelModel[]
  ) { }
}

export class LoyaltyLevelModel {
  constructor(
    public id?: number,
    public name?: string,
    public begin_date?: string,
    public end_date?: string,
    public accrual_rule = "no_accrual",
    public accrual_percent?: number,
    public accrual_points?: number,
    public accrual_money?: number,
    public burning_rule = "no_burning",
    public burning_days?: number,
    public activation_rule = "activation_moment",
    public activation_days?: number,
    public write_off_rule = "no_write_off",
    public write_off_rule_percent?: number,
    public write_off_rule_points?: number,
    public accordance_rule = "no_accordance",
    public accordance_percent?: number,
    public accordance_points?: number,
    public accrual_on_points = false,
    public min_price?: number,
    public loyalty_program_id?: number
  ) { }
}

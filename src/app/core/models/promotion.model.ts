export class PromotionModel {
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
    public rounding_rule = "no_rounding",
    public accrual_on_points = false,
    public write_off_limited = false,
    public write_off_min_price = 0
  ) { }
}

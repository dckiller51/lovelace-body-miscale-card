import { LovelaceCardConfig } from 'custom-card-helpers';
export interface BodyMiScaleCardConfig extends LovelaceCardConfig {
  type: string;
  image?: string;
  models?: boolean;
  entity: string;
  name?: string | boolean;
  show_name?: boolean;
  show_states?: boolean;
  show_attributes?: boolean;
  show_body?: boolean;
  show_buttons?: boolean;
  show_toolbar?: boolean;
  clickable?: boolean;
  open: boolean;
  styles: {
    background: string;
    icon: string;
    iconbody: string;
    content: string;
  }
}

export enum NumberFormat {
  language = "language",
  system = "system",
  comma_decimal = "comma_decimal",
  decimal_comma = "decimal_comma",
  space_comma = "space_comma",
  none = "none",
}

//export enum TimeFormat {
//  language = "language",
//  system = "system",
//  am_pm = "12",
//  twenty_four = "24",
//}

export interface FrontendLocaleData {
  language: string;
  number_format: NumberFormat;
//  time_format: TimeFormat;
}
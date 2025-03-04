/**
 * Types and interfaces for the Bodymiscale card configuration.
 * Used to structure the data displayed in the Home Assistant card.
 */
import {
  HassEntityAttributeBase,
  HassEntityBase,
} from 'home-assistant-js-websocket';
import { TemplateResult, nothing as litNothing } from 'lit';

export * from 'home-assistant-js-websocket';

export type TemplateNothing = typeof litNothing;
export type Template = TemplateResult | TemplateNothing;

export type BodymiscaleEntityState = 'ok' | 'problem' | 'unknown' | 'unavailable';

export interface BodymiscaleAttributes extends HassEntityAttributeBase {
  key: string;
  icon?: string;
  label?: string;
  unit?: string;
  status?: BodymiscaleEntityState;
  state?: BodymiscaleEntityState;
  service?: string;
  compute?: (value: any) => any;
}

export interface BodymiscaleEntity extends HassEntityBase {
  attributes: BodymiscaleAttributes;
  state: BodymiscaleEntityState;
}

export interface BodymiscaleCardStat {
  key: string;
  attribute?: string;
  unit?: string;
  service?: string;
  compute?: (value: any) => any;
  height?: string | number;
  direction?: 'right' | 'up';
  positions?: {
    icon?: 'outside' | 'inside' | 'off';
    name?: 'outside' | 'inside' | 'off';
    minmax?: 'outside' | 'inside' | 'off';
    value?: 'outside' | 'inside' | 'off';
  };
  min?: number;
  max?: number;
  target?: number;
  width?: string;
  color?: string;
  severity?: NumericSeverity | TextSeverity;
}

export interface BodymiscaleCardConfig {
  attributes: Record<string, BodymiscaleCardStat[]>;
  body: Record<string, BodymiscaleCardStat[]>;
  buttons: boolean | Record<string, any>;
  clickable?: boolean;
  color?: string;
  columns?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  entity: string;
  height: string | number;
  image?: string;
  max?: number;
  min?: number;
  // 'model' determines whether impedance measurements are supported.
  model?: boolean;
  // 'models' might be used for handling multiple models/configurations.
  models?: boolean;
  name?: string | boolean;
  open: boolean;
  positions?: {
    icon?: 'outside' | 'inside' | 'off';
    name?: 'outside' | 'inside' | 'off';
    minmax?: 'outside' | 'inside' | 'off';
    value?: 'outside' | 'inside' | 'off';
  };
  severity?: NumericSeverity | TextSeverity;
  show_always_details?: boolean;
  show_name?: boolean;
  show_model?: boolean;
  show_unit?: boolean;
  show_theme?: boolean;
  show_states?: boolean;
  show_attributes?: boolean;
  show_body?: boolean;
  show_buttons?: boolean;
  show_toolbar?: boolean;
  stats: Record<string, BodymiscaleCardStat[]>;
  // 'state' is a key in the constants, used for entity state tracking.
  state?: string;
  states: Record<string, BodymiscaleCardStat[]>;
  styles: {
    background: string;
    icon: string;
    iconbody: string;
    content: string;
  };
  target?: string | number | null;
  theme?: boolean;
  type: string;
  unit?: boolean;
  width: string;
}

type NumericSeverity = { from: number; to: number; color: string }[];
type TextSeverity = { text: string; color: string }[];
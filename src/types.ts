/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type BodymiscaleEntityState =
  | 'ok'
  | 'problem'
  | 'unknown'
  | 'unavailable';

export interface BodymiscaleAttributes extends HassEntityAttributeBase {
  key: string;
  icon?: string;
  label?: string;
  unit?: string;
  status?: BodymiscaleEntityState;
  state?: BodymiscaleEntityState;
  compute?: (value: any) => any;
}

export interface BodymiscaleEntity extends HassEntityBase {
  attributes: BodymiscaleAttributes;
  state: BodymiscaleEntityState;
}

export interface RenderStateData {
  icon: string;
  key: string;
  label: string;
  unit: string;
}

export interface RenderAttributeData {
  compute?: (value: any) => any;
  icon?: string;
  impedance_required: boolean;
  key: string;
  label?: string;
  unit?: string;
}

export interface RenderBodyData {
  color?: string;
  compute?: (value: any) => any;
  height?: number | null;
  icon?: string;
  impedance_required: boolean;
  key: string;
  label?: string;
  max?: number | null;
  min?: number | null;
  positions?: {
    icon?: 'outside' | 'inside' | 'off' | undefined;
    name?: 'outside' | 'inside' | 'off' | undefined;
    minmax?: 'outside' | 'inside' | 'off' | undefined;
    value?: 'outside' | 'inside' | 'off' | undefined;
  };
  severity?: string | NumericSeverity | null;
  target?: number | null;
  unit?: string;
  width?: string;
}

export interface RenderIconData {
  icon?: string;
  key: string;
}

export interface BodymiscaleCardConfig {
  entity: string;
  image: string;
  model: boolean;
  name?: string;
  theme: boolean;
  show_name: boolean;
  show_states: boolean;
  show_attributes: boolean;
  show_always_details: boolean;
  show_toolbar: boolean;
  show_body: boolean;
  show_buttons: boolean;
  body: Record<string, RenderBodyData>;
  positions?: {
    icon?: 'outside' | 'inside' | 'off';
    name?: 'outside' | 'inside' | 'off';
    minmax?: 'outside' | 'inside' | 'off';
    value?: 'outside' | 'inside' | 'off';
  };
  severity?: string | NumericSeverity | null;
  height?: number | null;
  stats: Record<string, RenderStateData[]>;
  states: Record<string, RenderStateData[]>;
  styles: {
    background: string;
    icon: string;
    iconbody: string;
  };
  target?: string | number | null;
  min?: number | null;
  max?: number | null;
  unit?: boolean;
  width?: string;
  color?: string;
  buttons: boolean | Record<string, any>;
  attributes: Record<string, RenderAttributeData>;
  open: boolean;
  [key: string]: any;
}

export type PositionKeys = 'icon' | 'name' | 'minmax' | 'value';
export type NumericSeverity = { from: number; to: number; color: string }[];
